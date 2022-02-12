import { split } from 'lodash'
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

const run = ({ args, actualDir, files }: CommandProps): Command => {
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

    const file = fakeFileSystemHelper.getFile(files, args, [actualDir], true)

    if (!file) {
        return {
            output: [
                { action: 'add', value: [`File ${args} doesn't exists.`, ''] },
            ],
        }
    }

    const fileType = split(file.type, '/')
    if (fileType[0] !== 'text') {
        return {
            output: [
                {
                    action: 'add',
                    value: [
                        '',
                        `MZÉ♥♦  ©@Ó♫▼║♫┤ ═!©☺L═!.`,
                        // eslint-disable-next-line max-len
                        `$♣·∟AørÝAørÝAørÝU­wý@ørÝU­qýCørÝU­výPørÝAøsÝbørÝU­sýFørÝU­zýCørÝU­ìÝ@ørÝU­pý@ørÝRichAørÝPEdå♠MÝ(­"♂☻♫¶$0¶►@☺►☻`,
                        '',
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

    if (typeof file.content === 'string') {
        return { output: [{ action: 'add', value: ['', file.content, ''] }] }
    }

    const cont = file.content as string[]
    return { output: [{ action: 'add', value: ['', ...cont, ''] }] }
}

export const type = { run, help }
