import { Command, CommandProps } from "../contexts/CommandContext";
import { helpNotAvailable } from "../helpers/commands";

export const help = (props: CommandProps): Command => {

    const commands = props.allCommands;
    const args = props.args;
    
    if (!args ) {
        const output = commands.reduce((acc, command) => {
            if (command.help) {
                acc.push(command.name.toUpperCase())
            }
            return acc
        }, [] as string[])

        return {
            output: [
                { action: 'add', value: [
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
                ...output,
                ''
                ]}
            ]
        }
    }
    
    const cmd = commands.filter(command => command.name===args || (command.alias && command.alias.includes(args)));

    if (cmd[0] && cmd[0].help) {
        let help;
        if (typeof cmd[0].help === 'function') {
            help = cmd[0].help();
        } 
        else {
            help = cmd[0].help;
        }

        return {
            output: [
                {action: 'add', value: ['', args.toUpperCase(), '']},
                {action: 'add', value: help},
                {action: 'add', value: ['']},
            ]
        }
    } 

    return helpNotAvailable({...props, name: args})
}