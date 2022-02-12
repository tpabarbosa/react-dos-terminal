import _ from 'lodash'
import { FakeCommand } from '../contexts/CommandContext'
import { FakeAttribute, FakeFile } from '../contexts/FileSystemContext'
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

const renameEqualFiles = (contentA: FakeFile[], contentB: FakeFile[]) => {
    const finalContent = [...contentA] as FakeFile[]
    contentB.forEach((file) => {
        if (file.type !== 'directory') {
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
        attributes: (mainAttrib(a, b) + hiddenAttrib(a, b)) as FakeAttribute,
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

const calcSize = (file: FakeFile) => {
    let filesize = file.size ?? 0
    filesize += (file.name.length + 3) * 2
    if (
        file.type === 'application/executable' ||
        file.type === 'application/system'
    ) {
        const x = file.content as FakeCommand
        filesize += fileSystemHelper.getCommandsSize([x])
    } else if (file.type.includes('text/')) {
        filesize += JSON.stringify(file.content).length * 2
    } else {
        const content = file.content as FakeFile[]
        const final = content.map((f) => {
            return { ...f, size: calcSize(f) }
        })
        const finalS = final.reduce((acc, f) => {
            return acc + f.size
        }, 0)
        filesize += finalS ?? 0
    }
    return filesize
}

const getFilesWithSize = (files: FakeFile[]): FakeFile[] => {
    const finalFiles = files.map((file) => {
        if (file.type !== 'directory') {
            return { ...file, size: calcSize(file) }
        }
        const dir = file.content as FakeFile[]
        const newContent = getFilesWithSize(dir)
        return { ...file, content: newContent, size: calcSize(file) }
    })
    return finalFiles
}

const createFakeFileSystem = (
    internal?: FakeFile[],
    external?: FakeFile[] | undefined
): { files: FakeFile[]; totalSize: number } => {
    if (!internal) {
        return { files: [], totalSize: 0 }
    }

    if (!external) {
        const totalSize: number = internal.reduce(
            (acc, file) => acc + (file.size ?? 0),
            0
        )
        return { files: [...internal], totalSize }
    }

    const mergedDirs = mergeEqualDirs(internal, external)
    const content = renameEqualFiles(internal, external)

    const test = content.map((file) => {
        const equalD = mergedDirs.find((dir) => dir.name === file.name)
        if (equalD && !_.isEmpty(equalD)) {
            return equalD
        }
        return file
    })

    external.forEach((file) => {
        const equalExt = test.find((f) => f.name === file.name)
        if (!equalExt || _.isEmpty(equalExt)) {
            test.push(file)
        }
    })

    const files = getFilesWithSize(test)

    const totalSize: number = files.reduce(
        (acc, file) => acc + (file.size ?? 0),
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
