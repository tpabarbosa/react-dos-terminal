import _ from 'lodash'
import { help } from '../commands/help'
import {
    Command,
    CommandProps,
    FakeCommand,
    useCommand,
} from '../contexts/CommandContext'
import { useFileSystem } from '../contexts/FileSystemContext'
import { useTerminal } from '../contexts/TerminalContext'
import commandsHelper from '../helpers/commands'

import fileSystemHelper from '../helpers/filesystem'
import { MainAction, MainState } from './machines/useMainMachine'

type UseCommandsHandlerProps = {
    state: MainState
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    action: (action: MainAction, arg?: any) => void
}

export const useCommandsHandler = ({ action }: UseCommandsHandlerProps) => {
    const terminal = useTerminal()
    const filesystem = useFileSystem()
    const command = useCommand()
    const { messages, shouldAllowHelp, allCommands } = command
    const { actualDir, allFiles: files } = filesystem

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
        const { name, args, isHelp } = getNameAndArgs(cmd)

        terminal.output.addToOutput(
            `${fileSystemHelper.formatPrompt(
                terminal.formatPrompt,
                actualDir
            )} ${cmd}`
        )

        if (name === '') {
            command.setActualCmd(null)
            return
        }

        const props = { name, args, allCommands, messages, actualDir, files }

        const dispatch = (response: Command, waitingMessage?: string[]) => {
            command.setActualCmd({
                name,
                args,
                waitingMessage,
                ...response,
            })

            if (response.configTerminal !== undefined) {
                if (response.configTerminal.config === 'setColors')
                    terminal.setConfig(response.configTerminal)
                if (response.configTerminal.config === 'setActualDir') {
                    filesystem.setActualDir(response.configTerminal.value)
                }
            }

            if (response.output) {
                terminal.output.addToQueue(response.output)
            }

            if (!waitingMessage) command.startRunningCommand()

            if (response.dynamic) {
                action('NEW_CMD', 'dynamic')
                return
            }
            action('NEW_CMD', 'static')
        }

        const runAction = async (cm: FakeCommand) => {
            const waitingMessage = cm?.async?.waitingMessage
            if (waitingMessage) {
                terminal.output.addToQueue([
                    { action: 'add', value: waitingMessage },
                ])
                action('NEW_CMD', 'async')
            }

            if (cm.action) {
                const response = await cm.action(props)
                dispatch(response, waitingMessage)
                return
            }

            dispatch(commandsHelper.commandNotFound(props))
        }

        const runHelp = (cm: FakeCommand) => {
            if (cm.help) {
                dispatch(help({ ...props, name: 'help', args: name }))
            } else {
                dispatch(commandsHelper.helpNotAvailable(props))
            }
        }

        const executable = (p: CommandProps): FakeCommand | null => {
            if (_.isEmpty(p.files)) {
                return null
            }

            const pathsToSearch = [actualDir, '', '\\system']

            const c = pathsToSearch.reduce((acc, path) => {
                if (_.isEmpty(acc)) {
                    const dirContent = fileSystemHelper.getDir(files, path)

                    if (dirContent && dirContent.files) {
                        if (
                            dirContent.files[p.name] &&
                            (dirContent.files[p.name].t === 'e' ||
                                dirContent.files[p.name].t === 's')
                        ) {
                            return dirContent.files[p.name].c as FakeCommand
                        }
                        if (
                            dirContent.files[`${p.name}.com`] &&
                            (dirContent.files[`${p.name}.com`].t === 'e' ||
                                dirContent.files[`${p.name}.com`].t === 's')
                        ) {
                            return dirContent.files[`${p.name}.com`]
                                .c as FakeCommand
                        }
                        if (
                            dirContent.files[`${props.name}.exe`] &&
                            (dirContent.files[`${props.name}.exe`].t === 'e' ||
                                dirContent.files[`${props.name}.exe`].t === 's')
                        ) {
                            return dirContent.files[`${props.name}.exe`]
                                .c as FakeCommand
                        }
                    }
                }
                return acc
            }, {} as FakeCommand)
            if (!_.isEmpty(c)) {
                return c
            }

            return null
        }

        const terminalCommand: FakeCommand[] = allCommands.filter(
            (c) =>
                c.name.toLowerCase() === name.toLowerCase() ||
                c.alias?.find((a) =>
                    a.toLowerCase().includes(name.toLowerCase())
                )
        )

        if (terminalCommand[0]) {
            // try internal commands
            if (isHelp) {
                runHelp(terminalCommand[0])
                return
            }
            runAction(terminalCommand[0])
        } else {
            // try exec-files
            const executableCommand = executable(props)
            if (executableCommand) {
                if (isHelp) {
                    runHelp(terminalCommand[0])
                    return
                }
                runAction(executableCommand)
            } else {
                // is not a valid command
                dispatch(commandsHelper.commandNotFound(props))
            }
        }
    }

    return {
        run,
    }
}
