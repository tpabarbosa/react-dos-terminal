/* eslint-disable max-len */
import { Command, CommandProps } from '../contexts/CommandContext'

const help = [
    'The PROMPT command allows you to adjust how much information is shown in command prompt, including displaying any text you want, such as the name of the current directory, the time and date.',
    '',
    `PROMPT [text]`,
    '',
    '[text] specifies a new command prompt that can be made up of normal characters and the below special codes. If not specified, this command resets the command prompt to the default setting, which is the current drive letter and directory followed by the greater than symbol (>).',
    '',
    `Character       Description`,
    '   Sp              Current full path',
    '   $q              = (equal sign)',
    '   $g              > (greater than sign)',
    '   $l              < (less than sign)',
    '   $n              Current drive',
    '   $b              | (pipe symbol)',
    '   $$              $ (dollar sign)',
    '   $_              ENTER-LINEFEED',
    '   $a              & (ampersand)',
    `   $c              ( (left parenthesis)`,
    `   $f              ) (rigth parenthesis)`,
    `   $s              SPACE`,
    `   $t              current TIME`,
    `   $d              current DATE`,
    '',
]

const run = ({ args }: CommandProps): Command => {
    if (!args) {
        return {
            output: [
                { action: 'add', value: ['Prompt changed successfully.', ''] },
            ],
            configTerminal: { config: 'setPrompt', value: '' },
        }
    }

    return {
        output: [
            { action: 'add', value: ['Prompt changed successfully.', ''] },
        ],
        configTerminal: { config: 'setPrompt', value: args },
    }
}

export const prompt = { run, help }
