import DOMPurify from 'dompurify'
import _ from 'lodash'
import { FakeCommand } from '../contexts/CommandContext'
import { FakeFile } from '../contexts/FileSystemContext'

const replacePromptParams = (prompt: string, dir: string) => {
    let p = prompt.replace(/\$p/gi, `C:\\${dir}`)
    p = p.replace(/\$q/gi, '=')
    p = p.replace(/\$g/gi, '>')
    p = p.replace(/\$l/gi, '<')
    p = p.replace(/\$n/gi, 'C:')
    p = p.replace(/\$b/gi, '|')
    p = p.replace(/\$\$/gi, '$')
    p = p.replace(/\$_/gi, '\n')
    p = p.replace(/\$a/gi, '&')
    p = p.replace(/\$c/gi, '(')
    p = p.replace(/\$f/gi, ')')
    p = p.replace(/\$s/gi, ' ')
    p = p.replace(/\$t/gi, new Date().toLocaleTimeString())
    p = p.replace(/\$d/gi, new Date().toLocaleDateString())
    return p
}

const formatPrompt = (prompt: string, dir: string) => {
    const final = replacePromptParams(prompt, dir)
    return DOMPurify.sanitize(final)
}

const fullDirPath = (dir: string) => {
    return `C:\\${dir}`
}

const getDir = (files: FakeFile[], dirPath: string): FakeFile[] | null => {
    const parts = dirPath.split('\\')
    let obj = files
    for (let i = 0; i < parts.length; i += 1) {
        if (parts[i] === '') {
            // eslint-disable-next-line no-continue
            continue
        }
        const test = obj.find((c) => c.name === parts[i])
        if (test) {
            obj = test.content as FakeFile[]
        } else {
            return null
        }
    }
    return obj
}

const getFile = (
    files: FakeFile[],
    name: string,
    pathsToSearch: string[],
    matchFullName = false
) => {
    const regexAttrib = /(.+?)(\.[^.]*$|$)/

    const c = pathsToSearch.reduce((acc, path) => {
        if (_.isEmpty(acc)) {
            const dirContent = getDir(files, path)
            if (dirContent) {
                const fileName = name.toLowerCase()

                let file: FakeFile | undefined
                if (!matchFullName) {
                    file = dirContent.find((f) => {
                        const match = f.name.match(regexAttrib)
                        return (
                            match &&
                            (match[0].toLowerCase() === fileName ||
                                match[1].toLowerCase() === fileName)
                        )
                    })
                } else {
                    file = dirContent.find(
                        (f) => f.name.toLowerCase() === fileName
                    )
                }

                if (file) {
                    return file as FakeFile
                }
            }
        }
        return acc
    }, {} as FakeFile)

    if (!_.isEmpty(c)) {
        return c
    }

    return null
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
    getFile,
    getCommandsSize,
    fullDirPath,
    formatPrompt,
}

export default fileSystemHelper
