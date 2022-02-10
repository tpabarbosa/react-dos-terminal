import { TerminalColors } from '../components/Terminal'
import { FakeCommand } from '../contexts/CommandContext'
import { FakeFile } from '../contexts/FileSystemContext'

export type TerminalLoadingScreenOptions = 'always' | 'never' | 'first-time'

export interface TerminalLoadingScreen {
    shouldShow: string // TerminalLoadingScreenOptions;
    messageOrElement: string | string[] | JSX.Element
    loadingTime: number
}

export interface TerminalConfig {
    colors: TerminalColors
    showOldScreenEffect: boolean
    autoFocus: boolean
    initialOutput: string[]
    formatPrompt: string
}

export interface CommandsMessages {
    toBeImplemented: string
    notFound: string
    cantBeExecuted: string
    helpNotAvailable: string
}
export interface CommandsConfig {
    commands: FakeCommand[]
    excludeCommands: string[] | 'all'
    shouldAllowHelp: boolean
    messages: Partial<CommandsMessages>
}

export interface TerminalFileSystemConfig {
    files: FakeFile[]
    initialDir: string
    useFakeFileSystem: boolean
    useInternalFiles: boolean
}

export interface TerminalDefaults {
    shouldPersisteData: boolean
    loadingScreen: Partial<TerminalLoadingScreen>
    terminal: Partial<TerminalConfig>
    commands: Partial<CommandsConfig>
    fileSystem: Partial<TerminalFileSystemConfig>
}

export const defaults: TerminalDefaults = {
    shouldPersisteData: true,
    loadingScreen: {
        shouldShow: 'first-time',
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
    },
    commands: {
        commands: [],
        excludeCommands: [],
        shouldAllowHelp: true,
        messages: {
            toBeImplemented: `Error: "%n" command hasn't been implemented.`,
            notFound: `Error: "%n" is not a valid command.`,
            cantBeExecuted: `Error: "%n" can't be executed.`,
            helpNotAvailable: `Error: "%n" doesn't have any help available.`,
        },
    },
    fileSystem: {
        files: [],
        initialDir: '',
        useFakeFileSystem: true,
        useInternalFiles: true,
    },
}
