import { TerminalColors } from '../components/Terminal'
import { FakeCommand } from '../contexts/CommandContext'
import { FakeFile } from '../contexts/FileSystemContext'

export type TerminalLoadingScreenOptions = 'always' | 'never' | 'first-time'

export interface TerminalLoadingScreen {
    showLoadingScreen: string // TerminalLoadingScreenOptions;
    messageOrElement: string | string[] | JSX.Element
    loadingTime: number
}

export interface TerminalConfig {
    colors: TerminalColors
    showOldScreenEffect: boolean
    autoFocus: boolean
    initialOutput: string[]
    formatPrompt: string
    shouldTypewrite: boolean
}

export interface CommandsMessages {
    toBeImplemented: string
    notFound: string
    cantBeExecuted: string
    helpNotAvailable: string
    isAlreadyRunning: string
}
export interface CommandsConfig {
    customCommands: FakeCommand[]
    excludeInternalCommands: string[] | 'all'
    shouldAllowHelp: boolean
    messages: Partial<CommandsMessages>
}

export interface TerminalFileSystemConfig {
    customFiles: FakeFile[]
    initialDir: string
    useFakeFileSystem: boolean
    excludeInternalFiles: boolean
}

export interface TerminalDefaults {
    shouldPersisteUserData: boolean
    loadingScreen: Partial<TerminalLoadingScreen>
    terminal: Partial<TerminalConfig>
    commands: Partial<CommandsConfig>
    fileSystem: Partial<TerminalFileSystemConfig>
}

export const defaults: TerminalDefaults = {
    shouldPersisteUserData: true,
    loadingScreen: {
        showLoadingScreen: 'first-time',
        messageOrElement: [
            'Installing IOS react-dos-terminal',
            '',
            'Please wait...',
            '',
        ],
        loadingTime: 5000,
    },
    terminal: {
        colors: {
            background: '#000000',
            color: '#aaaaaa',
        },
        autoFocus: true,
        showOldScreenEffect: true,
        initialOutput: ['Welcome to IOS react-dos-terminal', '', ''],
        formatPrompt: '$p$g',
        shouldTypewrite: true,
    },
    commands: {
        customCommands: [],
        excludeInternalCommands: [],
        shouldAllowHelp: true,
        messages: {
            toBeImplemented: `Error: "%n" command hasn't been implemented.`,
            notFound: `Error: "%n" is not a valid command.`,
            cantBeExecuted: `Error: "%n" can't be executed.`,
            helpNotAvailable: `Error: "%n" doesn't have any help available.`,
            isAlreadyRunning: `Error: "%n" is already running.`,
        },
    },
    fileSystem: {
        customFiles: [],
        initialDir: '',
        useFakeFileSystem: true,
        excludeInternalFiles: false,
    },
}
