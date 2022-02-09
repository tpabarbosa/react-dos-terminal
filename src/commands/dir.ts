/* eslint-disable max-len */
import _ from 'lodash'
import { Command, CommandProps } from '../contexts/CommandContext'
import { FakeFileSystem } from '../contexts/FileSystemContext'
import fileSystemHelper from '../helpers/filesystem'

const help = [
    'The DIR command displays information about files and directories, and how much disk space is available.',
    '',
    `DIR [path] [/a[:Attributes]]`,
    '',
    `/a:Attributes	   Displays only files with the specified file attributes. Attributes is a series of letters, each representing an attribute as shown below.`,
    '',
    `h: shows hidden files`,
    '',
]

const run = ({ args, files, actualDir }: CommandProps): Command => {
    const device = () => {
        const dvc = navigator.userAgent.match(
            /(MSIE|(?!Gecko.+)Firefox|(?!AppleWebKit.+Chrome.+)Safari|(?!AppleWebKit.+)Chrome|AppleWebKit(?!.+Chrome|.+Safari)|Gecko(?!.+Firefox))(?: |\/)([\d.apre]+)/
        )
        return dvc ?? 'OS'
    }

    const getInitialOutput = (finalPath: string) => {
        const dev = device()
        return [
            '',
            `Volume in drive C is ${dev[1]}`,
            `Volume version is ${dev[2]}`,
            '',
            `Directory of ${fileSystemHelper.fullDirPath(finalPath)}`,
            '',
            '',
        ]
    }

    const getFinalOutput = (
        f: FakeFileSystem,
        filesNumber: number,
        dirsNumber: number,
        size: number
    ) => {
        const freeSize = (4194304 - f.totalSize).toLocaleString('en-US', {
            minimumFractionDigits: 0,
        })

        return [
            '',
            `   ${filesNumber} File(s)   ${
                size.toLocaleString('en-US', { minimumFractionDigits: 0 }) ?? 0
            } bytes`,
            `   ${dirsNumber} Dir(s)   ${freeSize} bytes free`,
            '',
            '',
        ]
    }

    const output = (
        f: FakeFileSystem,
        finalPath: string,
        content: FakeFileSystem,
        showHidden: boolean
    ) => {
        let filesNumber = 0
        let dirsNumber = 0
        let size = 0
        const space = ' '

        if (!content.files) {
            return [
                ...getInitialOutput(finalPath),
                ...getFinalOutput(f, filesNumber, dirsNumber, size),
            ]
        }

        const dirContent = Object.keys(content.files).reduce((acc, item) => {
            let text = ''
            if (showHidden || content.files[item].a[1] !== 'h') {
                if (
                    content.files[item].t === 'f' ||
                    content.files[item].t === 'e' ||
                    content.files[item].t === 's'
                ) {
                    filesNumber += filesNumber
                    size += content.files[item].s
                    text = `${item}${space.repeat(
                        28 - item.length
                    )}${content.files[item].s.toLocaleString('en-US', {
                        minimumFractionDigits: 0,
                    })}`
                } else {
                    dirsNumber += dirsNumber
                    text = `${item}${space.repeat(20 - item.length)}&ltDIR&gt`
                }
                acc.push(text)
            }
            return acc
        }, [] as string[])

        if (!dirContent || _.isEmpty(dirContent)) {
            return [
                ...getInitialOutput(finalPath),
                ...getFinalOutput(files, filesNumber, dirsNumber, size),
            ]
        }

        return [
            ...getInitialOutput(finalPath),
            ...dirContent,
            ...getFinalOutput(files, filesNumber, dirsNumber, size),
        ]
    }

    let showHidden = false
    const regexAttrib = /\/a:([a-zA-Z]+)/
    const match = args.match(regexAttrib)

    if (match && match[1] && match[1].includes('h')) {
        showHidden = true
    } else if (match && match[1] && !match[1].includes('h')) {
        return {
            output: [
                {
                    action: 'add',
                    value: [
                        `Error: ${match[0]} is not a valid argument.`,
                        '',
                        ...help,
                    ],
                },
            ],
        }
    }

    if (args === '' || (match && args === match[0])) {
        const content = fileSystemHelper.getDir(files, actualDir)

        if (content) {
            return {
                output: [
                    {
                        action: 'add',
                        value: output(files, actualDir, content, showHidden),
                    },
                ],
            }
        }
    }

    const options = args.split(' ')
    let result: string[] | undefined
    options.forEach((option) => {
        if ((match !== null && option !== match[0]) || !match) {
            const path = option
            const finalPath = path[0] === '\\' ? path : actualDir + path

            const content = fileSystemHelper.getDir(files, finalPath)
            if (content) {
                result = output(files, finalPath, content, showHidden)
            }
        }
    })

    if (result) {
        return { output: [{ action: 'add', value: result }] }
    }
    return {
        output: [
            { action: 'add', value: ['Error: directory does not exist.', ''] },
        ],
    }
}

export const dir = { run, help }
