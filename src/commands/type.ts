import { split } from 'lodash'
import { Buffer } from 'buffer'
import { Command, CommandProps } from '../contexts/CommandContext'
import fakeFileSystemHelper from '../helpers/filesystem'

const help = [
    // eslint-disable-next-line max-len
    'The TYPE command displays the contents of a text file. However, it does not allow you to edit the file, or add new text.',
    '',
    'The TYPE command has no options.',
    '',
    'TYPE [filename]',
    '',
    'Filename is the name of the file to show.',
    '',
]

const run = ({ args, currentDir, files }: CommandProps): Command => {
    if (!args) {
        return {
            output: [
                {
                    action: 'add',
                    value: [
                        `Error: TYPE command requires an argument.`,
                        '',
                        ...help,
                    ],
                },
            ],
        }
    }

    const file = fakeFileSystemHelper.getFile(files, args, [currentDir], true)

    if (!file) {
        return {
            output: [
                { action: 'add', value: [`File ${args} doesn't exists.`, ''] },
            ],
        }
    }

    const getAsciiText = () => {
        const t =
            'action' in file.content && file.content.action
                ? file.content.action.toString()
                : ('' as string)

        const ar8 = new TextEncoder().encode(JSON.stringify(file) + t)
        const buf = Buffer.from(ar8)
        const ar16 = new Uint16Array(
            buf.buffer,
            buf.byteOffset,
            buf.byteLength / Uint16Array.BYTES_PER_ELEMENT
        )

        const arr = ar16.reduce((acc, value, index) => {
            const val = index % 2 === 0 ? value % 32.768 : value % 512
            acc.push(parseInt(val.toFixed(0), 10))
            return acc
        }, [] as number[])
        return String.fromCharCode(...arr)
    }

    const fileType = split(file.type, '/')
    if (fileType[0] !== 'text' && file.type !== 'application/bat') {
        return {
            output: [
                {
                    action: 'add',
                    value: [
                        '',
                        `MZÉ♥♦  ©@Ó♫▼║♫┤ ═!©☺L═!. ${getAsciiText()}`,
                        // `$♣·∟AørÝAørÝAørÝU­wý@ørÝU­qýCørÝU­výPør`,
                        // `ÝAøsÝbørÝU­sýFørÝU­`,
                        `zýCørÝU­ìÝ@ørÝU­pý@ørÝRichAørÝ`,
                        `PEdå♠MÝ(­"♂☻♫¶$0¶►@☺►☻`,
                        '',
                        `@╠' └"T► ↑☺(!►☺.textÓ   ►`,
                        `♦ '.rdata╠`,
                        `♫@@.datax♠0☻↑@└.pdata╠@☻,`,
                        '',
                        '',
                    ],
                },
            ],
        }
    }

    if ('text' in file.content && file.content.text) {
        if (typeof file.content.text === 'string') {
            return {
                output: [{ action: 'add', value: ['', file.content.text, ''] }],
            }
        }
        return {
            output: [{ action: 'add', value: ['', ...file.content.text, ''] }],
        }
    }

    const cont = file.content as string[]
    return { output: [{ action: 'add', value: ['', ...cont, ''] }] }
}

export const type = { run, help }
