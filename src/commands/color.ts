/* eslint-disable max-len */
import { TerminalColors } from '../components/Terminal'
import { Command, CommandProps } from '../contexts/CommandContext'
import colorsHelper from '../helpers/colors'

const help = [
    'The COLOR command is used to configure the terminal colors.',
    '',
    `COLOR [HH]`,
    '',
    'Color attributes are specified by TWO hex digits -- the first corresponds to the background; the second the foreground. Digits MUST BE diferent. Each digit can be any of the below values:',
    '',
    `0 = Black       8 = Gray`,
    '1 = Blue        9 = Light Blue',
    '2 = Green       A = Light Green',
    '3 = Aqua        B = Light Aqua',
    '4 = Red         C = Light Red',
    '5 = Purple      D = Light Purple',
    '6 = Yellow      E = Light Yellow',
    `7 = White       F = Bright White`,
    '',
]

const run = ({ args }: CommandProps): Command => {
    const re = /[0-9A-Fa-f]{2}/g

    if (!args || !re.test(args) || args[0] === args[1]) {
        return { output: [{ action: 'add', value: help }] }
    }

    const colors: TerminalColors = {
        background: colorsHelper.getColorByHex(args[0]),
        color: colorsHelper.getColorByHex(args[1]),
    }

    return {
        output: [
            { action: 'add', value: ['Colors changed successfully.', ''] },
        ],
        configTerminal: { config: 'setColors', value: colors },
    }
}

export const color = { run, help }
