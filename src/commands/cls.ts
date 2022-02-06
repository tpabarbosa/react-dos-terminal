import { Command, CommandProps } from "../contexts/CommandContext";

export const cls = ({name, args}: CommandProps): Command  => {
    
    if (args !== '' && args !== '/?') {
        return {output:[{action: 'add', value: [
            `Error: CLS command doesn't have arguments.`, 
            '', ...help
        ]}]}
    }

    const reg = /\/\?/;
    if (reg.test(name) || args === '/?') {
        return { output: [{action: 'add', value: help
        }]}
    }

    return {
        output: [{action: 'clear'}],
    }
}
    
const help = [
    '',
    'CLS',
    '', 
    'Clears the command prompt screen.', 
    ''
]