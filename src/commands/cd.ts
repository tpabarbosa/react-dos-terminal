/* eslint-disable max-len */
import { Command, CommandProps } from '../contexts/CommandContext'
import fileSystemHelper from '../helpers/filesystem'

const run = ({ name, args, files, currentDir }: CommandProps): Command => {
    if (!args && (name === 'cd' || name === 'chdir')) {
        return {}
    }

    if (name === 'cd\\' || name === 'chdir\\') {
        return { configTerminal: { config: 'setCurrentDir', value: '' } }
    }

    const regexNameReturn = /\.\./
    if (regexNameReturn.test(name) && currentDir === '') {
        return {
            output: [
                {
                    action: 'add',
                    value: [`Error: You can't move back from root.`, ''],
                },
            ],
        }
    }
    if (regexNameReturn.test(name) && currentDir !== '') {
        return { configTerminal: { config: 'setCurrentDir', value: '' } }
    }

    if (args[0] === '\\' && args.length === 1) {
        return { configTerminal: { config: 'setCurrentDir', value: '' } }
    }

    if (args[0] === '\\' && args.length > 1) {
        const dirPath = args.substring(1)
        const dirContent = fileSystemHelper.getDir(files, dirPath)
        if (dirContent) {
            return {
                configTerminal: { config: 'setCurrentDir', value: dirPath },
            }
        }

        return {
            output: [
                {
                    action: 'add',
                    value: [`This directory doesn't exists.`, ''],
                },
            ],
        }
    }

    if (args[0] !== '\\') {
        const dirPath = `${currentDir}\\${args}`
        const dirContent = fileSystemHelper.getDir(files, dirPath)
        const newDir = currentDir === '' ? args : `${currentDir}\\${args}`
        if (dirContent) {
            return {
                configTerminal: { config: 'setCurrentDir', value: newDir },
            }
        }

        return {
            output: [
                {
                    action: 'add',
                    value: [`This directory doesn't exists.`, ''],
                },
            ],
        }
    }

    return {
        output: [
            {
                action: 'add',
                value: [`Error: Some strange error has occurred.`, ''],
            },
        ],
    }
}

const help = [
    `CHDIR (change directory) is a command used to switch directories.`,
    '',
    `CHDIR [path]   If path directory is available in the current directory, it takes you into path directory.`,
    `CHDIR \\[path]  If path directory is available, it would first move back to the root of the drive and then go into the path directory.`,
    `CHDIR\\   Goes to the highest level (the root) of the drive.`,
    `CHDIR..  Moves back one directory.`,
    '',
    `CD [path]   If path directory is available in the current directory, it takes you into path directory.`,
    `CD \\[path]  If path directory is available, it would first move back to the root of the drive and then go into the path directory.`,
    `CD\\   Goes to the highest level (the root) of the drive.`,
    `CD..  Moves back one directory.`,
    '',
]

export const cd = { run, help }
