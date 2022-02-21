/* eslint-disable max-len */
import _ from 'lodash'
import { Command, CommandProps, FakeCommand } from '../contexts/CommandContext'
import commandsHelper from '../helpers/commands'
import fileSystemHelper from '../helpers/filesystem'

export const help = async (props: CommandProps): Promise<Command> => {
    const commands = props.allCommands
    const { args, files, currentDir } = props

    const helpText = (cmd: FakeCommand): string | string[] => {
        if (cmd && cmd.help) {
            if (typeof cmd.help === 'function') {
                return cmd.help()
            }
            return cmd.help
        }
        return ''
    }

    if (!args) {
        const output = commands.reduce((acc, command) => {
            if (command.help) {
                acc.push(command.name.toUpperCase())
            }
            return acc
        }, [] as string[])

        return {
            output: [
                {
                    action: 'add',
                    value: [
                        '',
                        'HELP',
                        '',
                        `The HELP command is used to access the help for available commands.`,
                        '',
                        `HELP [command]`,
                        ``,
                        `command	Displays help information on that command.`,
                        '',
                        'Help is available for those commands:',
                        '',
                        ...output.sort(),
                        '',
                    ],
                },
            ],
        }
    }

    let h: string | string[]
    const cmd = commands.filter(
        (command) =>
            command.name === args ||
            (command.alias && command.alias.includes(args))
    )

    h = helpText(cmd[0])

    if (_.isEmpty(h)) {
        const systemPaths = [currentDir, '', '\\system']
        const file = fileSystemHelper.getFile(files, args, systemPaths)
        if (
            file &&
            (file.type === 'application/executable' ||
                file.type === 'application/system')
        ) {
            h = helpText(file.content as FakeCommand)
        }
    }

    if (!_.isEmpty(h)) {
        return {
            output: [
                { action: 'add', value: ['', args.toUpperCase(), ''] },
                { action: 'add', value: h },
                { action: 'add', value: [''] },
            ],
        }
    }

    if (commandsHelper.helpNotAvailable.action) {
        return commandsHelper.helpNotAvailable.action({
            ...props,
            name: args,
        })
    }

    return {
        output: [{ action: 'add', value: 'Error: Unknown error' }],
    }
}
