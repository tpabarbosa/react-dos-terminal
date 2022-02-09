import _ from 'lodash'
import { FakeCommand } from '../contexts/CommandContext'
import {
    FakeAttributes,
    FakeFile,
    FakeFileSystem,
    FakeFileTypesAbr,
} from '../contexts/FileSystemContext'
import fileSystemHelper from './filesystem'

const createCommands = (internal: FakeCommand[], external?: FakeCommand[]) => {
    if (!external) {
        return internal
    }
    const internalCommands = internal.reduce((acc, intCmd) => {
        const equalCmd = external.filter(
            (extCmd) => intCmd.name === extCmd.name
        )
        if (equalCmd.length > 0) {
            acc.push({ ...intCmd, ...equalCmd[0] })
        } else {
            acc.push(intCmd)
        }
        return acc
    }, [] as FakeCommand[])

    const uniqueExternalCommands = external.reduce((acc, cmd) => {
        const found = internalCommands.filter((c) =>
            _.isEqual(cmd.name, c.name)
        )
        if (!found[0]) acc.push(cmd)
        return acc
    }, [] as FakeCommand[])

    return [...internalCommands, ...uniqueExternalCommands]
}

const excludeCommands = (
    commands: FakeCommand[],
    toExclude?: string[] | 'all'
) => {
    if (!toExclude || toExclude.length === 0) {
        return commands
    }

    if (toExclude === 'all') {
        return [] as FakeCommand[]
    }

    const finalCommands = commands.filter(
        (command) => !toExclude.includes(command.name)
    )

    return finalCommands
}

const calcFileSize = (
    name: string,
    file: {
        c: string | string[] | FakeCommand | FakeFileSystem
        a: FakeAttributes
        t: 'd' | 'f' | 'e' | 's'
    }
) => {
    let filesize = (name.length + 3) * 2
    if (file.t === 'e' || file.t === 's') {
        const x = file.c as FakeCommand
        filesize += fileSystemHelper.getCommandsSize([x])
    } else if (file.t === 'f') {
        filesize += JSON.stringify(file.c).length * 2
    } else {
        const content = file.c as FakeFileSystem
        filesize += content.totalSize ?? 0
    }
    return filesize
}

const createFileSystemFromArray = (files: FakeFile[]) => {
    const final: FakeFileSystem = {} as FakeFileSystem
    let totalSize = 0
    const obj = files.reduce((acc, file) => {
        let contentDir: FakeFileSystem = {} as FakeFileSystem
        let contentOther: string | string[] | FakeCommand = ''
        if (file.type === 'directory') {
            contentDir = createFileSystemFromArray(file.content as FakeFile[])
        } else if (file.type === 'file' && typeof file.content === 'string') {
            contentOther = file.content as string
        } else if (file.type === 'file' && typeof file.content !== 'string') {
            contentOther = file.content as string[]
        } else {
            contentOther = file.content as FakeCommand
        }

        let newFileType: FakeFileTypesAbr | undefined

        if (file.type === 'directory') {
            newFileType = 'd'
        } else if (file.type === 'file') {
            newFileType = 'f'
        } else if (file.type === 'exec-file') {
            newFileType = 'e'
        } else {
            newFileType = 's'
        }

        const newContent = file.type === 'directory' ? contentDir : contentOther

        const fileObj = {
            c: newContent,
            a: file.attributes,
            t: newFileType,
        }

        const fs = file.fakeFileSize ?? 0
        const filesize = calcFileSize(file.name, fileObj) + fs
        totalSize += filesize
        acc.files = {
            ...acc.files,
            [file.name]: {
                ...fileObj,
                s: filesize,
            },
        }

        acc.totalSize = totalSize
        return acc
    }, final)

    return obj
}

const renameEqualFiles = (contentA: FakeFile[], contentB: FakeFile[]) => {
    const finalContent = [...contentA] as FakeFile[]
    contentB.forEach((file) => {
        if (
            file.type === 'file' ||
            file.type === 'exec-file' ||
            file.type === 'system-file'
        ) {
            const found = contentA.filter((fileA) => fileA.name === file.name)
            if (found[0]) {
                const re = /(.+?)(\.[^.]*$|$)/
                const match = file.name.match(re)
                if (match && match[1] && match[2]) {
                    finalContent.push({
                        name: `${match[1]}(1)${match[2]}`,
                        type: file.type,
                        attributes: file.attributes,
                        content: file.content,
                    })
                }
            } else {
                finalContent.push(file)
            }
        }
    })
    return finalContent
}

const mainAttrib = (a: FakeFile, b: FakeFile) => {
    if (a.attributes[0] === 's' || b.attributes[0] === 's') {
        return 's'
    }
    if (a.attributes[0] === 'r' || b.attributes[0] === 'r') {
        return 'r'
    }

    return 'w'
}

const hiddenAttrib = (a: FakeFile, b: FakeFile) => {
    if (a.attributes[1] === 'h' || b.attributes[1] === 'h') {
        return 'h'
    }
    return ''
}

const getMergedDir = (a: FakeFile, b: FakeFile): FakeFile => {
    const contentA = a.content as FakeFile[]
    const contentB = b.content as FakeFile[]

    return {
        name: a.name,
        type: 'directory',
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        content: mergeEqualDirs(contentA, contentB),
        attributes: (mainAttrib(a, b) + hiddenAttrib(a, b)) as FakeAttributes,
    }
}

const mergeEqualDirs = (a: FakeFile[], b: FakeFile[]) => {
    const dirsA = a.filter((item) => item.type === 'directory')

    const mergedDirs: FakeFile[] = []
    dirsA.forEach((dirA) => {
        const dirB = b.filter(
            (item) => item.type === 'directory' && item.name === dirA.name
        )
        if (dirB[0]) {
            const mergedDir = getMergedDir(dirA, dirB[0])
            const contentA = dirA.content as FakeFile[]
            const contentB = dirB[0].content as FakeFile[]
            const finalContent = renameEqualFiles(contentA, contentB)
            mergedDir.content = [...finalContent]
            mergedDirs.push(mergedDir)
        }
    })
    return mergedDirs
}

const createFakeFileSystem = (
    internal?: FakeFile[],
    external?: FakeFile[] | undefined
): FakeFileSystem => {
    if (!internal) {
        return { files: {}, totalSize: 0 }
    }

    if (!external) {
        return createFileSystemFromArray(internal)
    }

    const mergedDirs = mergeEqualDirs(internal, external)
    const content = renameEqualFiles(internal, external)
    const int = createFileSystemFromArray(internal)
    const ext = createFileSystemFromArray(external)
    const cont = createFileSystemFromArray(content)
    const dirs = createFileSystemFromArray(mergedDirs)

    const files = { ...int.files, ...ext.files, ...cont.files, ...dirs.files }
    const totalSize: number = Object.values(files).reduce(
        (acc, file) => acc + file.s,
        0
    )

    const result = { files, totalSize }
    return result
}

const initializer = {
    createFakeFileSystem,
    createCommands,
    excludeCommands,
}

export default initializer
