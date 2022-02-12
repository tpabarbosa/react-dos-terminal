import { help } from '../commands/help'
import { reactDosTerminal } from '../commands/reactDosTerminal'
import { CommandScreen } from '../components/CommandScreen'
import Input from '../components/Input'
import { Main } from '../components/Main'
import Output from '../components/Output'
import { TerminalScreen } from '../components/TerminalScreen'
import { UserDefinedElement } from '../components/UserDefinedElement'
import { CommandContextProvider } from '../contexts/CommandContext'
import {
    FakeFile,
    FileSystemContextProvider,
    useFileSystem,
} from '../contexts/FileSystemContext'
import { TerminalContextProvider } from '../contexts/TerminalContext'
import commandsHelper from '../helpers/commands'
import fileSystemHelper from '../helpers/filesystem'
import initializer from '../helpers/initializer'

import { useMainMachine } from '../hooks/machines/useMainMachine'
import { useStateMachine } from '../hooks/machines/useStateMachine'
import { useCaretHandler } from '../hooks/useCaretHandler'
import { useCommandsHandler } from '../hooks/useCommandHandler'
import { useCommandsHistory } from '../hooks/useCommandsHistory'
import { useInput } from '../hooks/useInput'
import { useLoadingScreen } from '../hooks/useLoadingScreen'
import { useOutputHandler } from '../hooks/useOutputHandler'
import { commandsList } from './commands'

export const files: FakeFile[] = [
    {
        name: 'readme.txt',
        type: 'text/plain',
        content: reactDosTerminal.help,
        attributes: 'p',
    },
    {
        name: 'system',
        type: 'directory',
        attributes: 'p',
        content: [
            {
                name: 'doskey.exe',
                type: 'application/system',
                attributes: 'ph',
                content: commandsHelper.isAlreadyRunning,
                size: fileSystemHelper.getFakeFileSize([
                    useCommandsHistory,
                    useCaretHandler,
                ]),
            },
            {
                name: 'help.com',
                type: 'application/executable',
                attributes: 'p',
                content: {
                    name: 'help',
                    action: help,
                },
                size: fileSystemHelper.getFakeFileSize(help),
            },
        ],
    },
    {
        name: 'command.com',
        type: 'application/system',
        attributes: 'ph',
        content: commandsHelper.isAlreadyRunning,
        size:
            fileSystemHelper.getCommandsSize(commandsList) +
            fileSystemHelper.getFakeFileSize([
                useCommandsHandler,
                useCaretHandler,
                useMainMachine,
                CommandContextProvider,
                CommandScreen,
            ]),
    },
    {
        name: 'io.sys',
        type: 'application/system',
        attributes: 'ph',
        content: commandsHelper.cantBeExecuted,
        size: fileSystemHelper.getFakeFileSize([
            Main,
            TerminalScreen,
            TerminalContextProvider,
            useLoadingScreen,
            initializer.createCommands,
            useStateMachine,
        ]),
    },
    {
        name: 'msdos.sys',
        type: 'application/system',
        attributes: 'ph',
        content: commandsHelper.cantBeExecuted,
        size: fileSystemHelper.getFakeFileSize([
            useFileSystem,
            FileSystemContextProvider,
            () => fileSystemHelper,
            initializer.createFakeFileSystem,
            Input,
            Output,
            UserDefinedElement,
            useInput,
            useOutputHandler,
        ]),
    },
]
