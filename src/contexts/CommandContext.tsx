import React, { createContext, useContext, useMemo, useReducer } from 'react'
import { TerminalColors } from '../components/Terminal'
import { CommandsMessages } from '../config'
import { FakeFile } from './FileSystemContext'

export interface FakeCommand {
    name: string
    alias?: string[]
    action?: (props: CommandProps) => Command | Promise<Command>
    async?: {
        waitingMessage?: string[]
    }
    help?: (() => string | string[]) | string | string[]
    beforeFinishMiddleware?: (
        props: CommandProps,
        command: Command | Promise<Command>
    ) => Command | Promise<Command>
}

export interface CommandProps {
    name: string
    args: string
    colors: TerminalColors
    currentDir: string
    files: FakeFile[]
    totalSize: number
    systemPaths: string[]
    allCommands: FakeCommand[]
    messages: CommandsMessages
}

export type CommandToOutput =
    | { action: 'clear' }
    | { action: 'add'; value: string | string[] }
    | { action: 'remove'; value: number }

export type CommandToConfigTerminal =
    | { config: 'setColors'; value: TerminalColors }
    | { config: 'setCurrentDir'; value: string }
    | { config: 'setPrompt'; value: string }

export interface Command {
    dynamic?: {
        element: JSX.Element
        options?: {
            shouldHideTerminalOutput?: boolean
        }
    }
    output?: CommandToOutput[]
    configTerminal?: CommandToConfigTerminal
}

export interface TerminalCommand extends Command {
    name: string
    args: string
    waitingMessage?: string[]
}

export interface CommandContextAPI extends CommandState {
    startRunningCommand: () => void
    endRunningCommand: () => void
    setActualCmd: (cmd: TerminalCommand | null) => void
}

export type CommandAction =
    | { type: 'isRunningCommand'; value: boolean }
    | { type: 'setActualCmd'; value: TerminalCommand | null }

export interface CommandState {
    allCommands: FakeCommand[]
    shouldAllowHelp: boolean
    actualCmd?: TerminalCommand | null
    isRunningCommand: boolean
    messages: CommandsMessages
}

export interface CommandProviderProps {
    children: React.ReactNode
    config: Partial<CommandState>
}

const CommandContext = createContext<CommandContextAPI | undefined>(undefined)

export const CommandContextProvider = ({
    children,
    config,
}: CommandProviderProps) => {
    const terminalCommandInitialState: CommandState = {
        allCommands: config?.allCommands as FakeCommand[],
        shouldAllowHelp: config?.shouldAllowHelp as boolean,
        actualCmd: null,
        isRunningCommand: false,
        messages: config.messages as CommandsMessages,
    }

    const reducer = (state: CommandState, action: CommandAction) => {
        switch (action.type) {
            case 'isRunningCommand':
                return { ...state, isRunningCommand: action.value }
            case 'setActualCmd':
                return { ...state, actualCmd: action.value }
            default:
                return state
        }
    }

    const [state, dispatch] = useReducer(reducer, terminalCommandInitialState)

    const cm = useMemo(() => {
        return {
            ...state,
            startRunningCommand: () => {
                dispatch({ type: 'isRunningCommand', value: true })
            },
            endRunningCommand: () => {
                dispatch({ type: 'isRunningCommand', value: false })
            },
            setActualCmd: (cmd: TerminalCommand | null) => {
                dispatch({ type: 'setActualCmd', value: cmd })
            },
        }
    }, [state])

    return (
        <CommandContext.Provider value={cm}>{children}</CommandContext.Provider>
    )
}

export const useCommand = () => {
    const ctx = useContext(CommandContext)

    if (ctx === undefined) {
        throw new Error(
            `useCommand must be used within a CommandContextProvider.`
        )
    }

    return ctx
}
