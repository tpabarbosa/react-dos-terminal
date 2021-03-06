import { Command, CommandProps } from '../contexts/CommandContext'

const help = ['The VER command displays the version of react-dos-terminal.']

const run = ({ args }: CommandProps): Command => {
    if (args !== '') {
        return {
            output: [
                {
                    action: 'add',
                    value: [
                        `Error: VER command doesn't have arguments.`,
                        '',
                        ...help,
                    ],
                },
            ],
        }
    }

    const version = '[VI]{version} - {date}[/VI]'
    return {
        output: [
            {
                action: 'add',
                value: ['', `react-dos-terminal`, `version: ${version}`, ''],
            },
        ],
    }
}

export const ver = { run, help }
