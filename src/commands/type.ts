import { Command, CommandProps } from '../contexts/CommandContext'
import { FakeFileSystem } from '../contexts/FileSystemContext'
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

    const content = fakeFileSystemHelper.getDir(
        files,
        actualDir
    ) as FakeFileSystem
    const file = content?.files[args] ? content?.files[args] : false

    if (!file) {
        return {
            output: [
                { action: 'add', value: [`File ${args} doesn't exists.`, ''] },
            ],
        }
    }

    if (file.t !== 'f') {
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

    if (typeof file.c === 'string') {
        return { output: [{ action: 'add', value: ['', file.c, ''] }] }
    }

    const cont = file.c as string[]
    return { output: [{ action: 'add', value: ['', ...cont, ''] }] }
}

export const type = { run, help }
