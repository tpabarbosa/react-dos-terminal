import _ from 'lodash'
import { help } from '../commands/help'
import {
    Command,
    CommandProps,
    FakeCommand,
    useCommand,
} from '../contexts/CommandContext'
import { useFileSystem } from '../contexts/FileSystemContext'
import { useTerminalInternal } from '../contexts/TerminalContext'
import commandsHelper from '../helpers/commands'

import fileSystemHelper from '../helpers/filesystem'
import { MainAction, MainState } from './machines/useMainMachine'

type UseCommandsHandlerProps = {
    state: MainState
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    action: (action: MainAction, arg?: any) => void
}

export const useCommandsHandler = ({ action }: UseCommandsHandlerProps) => {
    const terminal = useTerminalInternal()
    const filesystem = useFileSystem()
    const command = useCommand()
    const { messages, shouldAllowHelp, allCommands } = command
    const { currentDir, files, totalSize, systemPaths } = filesystem

    const run = async (cmd: string) => {
        const getNameAndArgs = (c: string) => {
            const index = c.indexOf(' ')
            let name = ''
            let args = ''
            let isHelp = false

            if (index !== -1) {
                name = c.substring(0, index).trim()
                args = c.substring(index + 1).trim()
            } else {
                name = c.trim()
            }

            if (shouldAllowHelp) {
                const reg = /\/\?/
                if (reg.test(name) && name !== '/?') {
                    isHelp = true
                    name = name.substring(0, name.length - 2)
                } else if (args === '/?') {
                    isHelp = true
                } else if (!reg.test(name) && name === '/?') {
                    isHelp = true
                }
            }
            return { name, args, isHelp }
        }
        const { name, args, isHelp } = getNameAndArgs(cmd.replace(/</g, '&lt;'))

        const prompt = terminal.promptCallback
            ? terminal.promptCallback(terminal.currentPrompt)
            : terminal.currentPrompt

        terminal.output.addLines(
            `${fileSystemHelper.formatPrompt(prompt, currentDir)} ${cmd.replace(
                /</g,
                '&lt;'
            )}`,
            true
        )

        if (name === '') {
            command.setActualCmd(null)
            return
        }

        const props = {
            name,
            args,
            allCommands,
            messages,
            currentDir,
            files,
            totalSize,
            systemPaths,
        }

        const dispatch = (response: Command) => {
            command.setActualCmd({
                name,
                args,
                ...response,
            })

            if (response.configTerminal !== undefined) {
                if (
                    response.configTerminal.config === 'setColors' ||
                    response.configTerminal.config === 'setPrompt'
                )
                    terminal.setConfig(response.configTerminal)
                if (response.configTerminal.config === 'setCurrentDir') {
                    filesystem.setCurrentDir(response.configTerminal.value)
                }
            }

            if (response.output) {
                terminal.output.addToQueue(response.output)
            }

            command.startRunningCommand()

            if (response.dynamic) {
                action('NEW_CMD', 'dynamic')
                return
            }
            action('NEW_CMD', 'static')
        }

        const runAction = async (cm: FakeCommand) => {
            const isAsync = cm?.async
            const waitingMessage = cm?.async?.waitingMessage
            if (isAsync) {
                action('NEW_CMD', 'async')
            }
            if (waitingMessage) {
                terminal.output.addLines(waitingMessage)
            }

            if (cm.action) {
                const response = await cm.action(props)
                dispatch(response)
                return
            }

            if (commandsHelper.commandNotFound.action) {
                const response = await commandsHelper.commandNotFound.action(
                    props
                )
                dispatch(response)
            }
        }

        const executable = (p: CommandProps): FakeCommand | null => {
            if (_.isEmpty(p.files)) {
                return null
            }

            const pathsToSearch = [currentDir, ...systemPaths]
            const file = fileSystemHelper.getFile(files, p.name, pathsToSearch)

            if (file) {
                if (
                    file.type === 'application/executable' ||
                    file.type === 'application/system'
                ) {
                    return file.content as FakeCommand
                }

                return commandsHelper.cantBeExecuted
            }

            return null
        }

        const terminalCommand: FakeCommand[] = allCommands.filter(
            (c) =>
                c.name.toLowerCase() === name.toLowerCase() ||
                c.alias?.find((a) => a.toLowerCase() === name.toLowerCase())
        )
        if (isHelp) {
            dispatch(await help({ ...props, name: 'help', args: name }))
            return
        }
        if (terminalCommand[0]) {
            // try internal commands
            runAction(terminalCommand[0])
        } else {
            // try exec-files
            const executableCommand = executable(props)
            if (executableCommand) {
                runAction(executableCommand)
            } else {
                // is not a valid command
                runAction(commandsHelper.commandNotFound)
            }
        }
    }

    return {
        run,
    }
}
