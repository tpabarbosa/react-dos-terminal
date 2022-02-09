import { FakeCommand } from '../contexts/CommandContext'
import { FakeFileSystem } from '../contexts/FileSystemContext'

const formatPrompt = (dir: string) => {
    return `C:\\${dir}>`
}

const fullDirPath = (dir: string) => {
    return `C:\\${dir}`
}

const getDir = (
    files: FakeFileSystem,
    dirPath: string
): FakeFileSystem | null => {
    const parts = dirPath.split('\\')
    let obj = files
    for (let i = 0; i < parts.length; i += 1) {
        if (parts[i] === '') {
            // eslint-disable-next-line no-continue
            continue
        }
        if (obj.files[parts[i]]) {
            obj = obj.files[parts[i]].c as FakeFileSystem
        } else {
            return null
        }
    }
    return obj
}

const getFakeFileSize = (
    func: ((...args: never) => unknown)[] | ((...args: never) => unknown)
) => {
    if (typeof func === 'function') {
        const x = func.toString()
        return JSON.stringify(x).length * 2
    }

    return func.reduce((acc, cmd) => {
        const x = cmd.toString()
        const val = acc + JSON.stringify(x).length * 2
        return val
    }, 0)
}

const getCommandsSize = (commands: FakeCommand[]) => {
    return commands.reduce((acc, cmd) => {
        let filesize = (cmd.alias ? cmd.alias.toString().length : 0) * 2
        // const ff = cmd.fakeFileSize ?? 0;
        const help = cmd.help ? cmd.help.toString().length : 0
        if (cmd.action) {
            filesize += getFakeFileSize([cmd.action]) + help + acc
            return filesize
        }
        return acc
    }, 0)
}

const fileSystemHelper = {
    getFakeFileSize,
    getDir,
    getCommandsSize,
    fullDirPath,
    formatPrompt,
}

export default fileSystemHelper
