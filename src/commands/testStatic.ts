import { Command, CommandProps } from '../contexts/CommandContext'

export const testStatic = ({ name, args }: CommandProps): Command => {
    return {
        output: [
            {
                action: 'add',
                value: [
                    `Testing command: ${name}`,
                    '',
                    args ? "Error: this command doesn't have arguments." : '',
                    '',
                ],
            },
        ],
    }
}
