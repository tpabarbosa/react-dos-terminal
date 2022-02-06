import { createContext, useContext, useMemo, useReducer } from "react"
import { TerminalColors } from "../components/Terminal"
import { TerminalCommandConfig } from "../config"

export interface FakeCommand {
    name: string,
    alias?: string | string[],
    action: (props: CommandProps) => Command | Promise<Command>,
    async?: {
        waitingMessage?: string[],
    }
}

export interface CommandProps {
    name: string, 
    args: string,
    help?: string[],
    allCommands: FakeCommand[],
}

export type CommandToOutput = {action: 'clear'} | 
    {action: 'add', value: string | string[]} |
    {action: 'remove', value: number}

export type CommandToConfigTerminal = {config: 'colors', value: TerminalColors}|
    {config: 'actualDir', value: string}

export interface Command {
    dynamic?: {
        element: JSX.Element,
        options?: {
            shouldHideTerminalOutput?: boolean,
        },
    },
    output?: CommandToOutput[],
    configTerminal?: CommandToConfigTerminal,
}

export interface TerminalCommand extends Command {
    name: string,
    args: string,
    waitingMessage?: string[],
}

export interface TerminalCommandContextAPI {
    state: TerminalCommandState,
    action: {
        startRunningCommand: () => void,
        endRunningCommand: () => void,
        setActualCmd: (cmd: TerminalCommand | null) => void,
    }
}

export interface Help{
    command: string,
    text: string[],
}

export interface TerminalCommandState {
    allCommands: FakeCommand[],
    allHelps?: Help[],
    actualCmd?: TerminalCommand | null,
    isRunningCommand: boolean,
}

export interface TerminalCommandProviderProps {
    children: React.ReactNode,
    config: TerminalCommandConfig,
}

const TerminalCommandContext = createContext<TerminalCommandContextAPI | undefined>(undefined)

export const TerminalCommandContextProvider = ({children, config}: TerminalCommandProviderProps) => {
    
    const action = useMemo(() => {return {
        startRunningCommand: () => {
            dispatch({type: 'isRunningCommand', value: true})
        },
        endRunningCommand: () => {
            dispatch({type: 'isRunningCommand', value: false})
        },
        setActualCmd: (cmd: TerminalCommand | null) => {
            dispatch({type: 'setActualCmd', value:cmd})
        }
    }}, [])

    const terminalCommandInitialState: TerminalCommandState = {
        allCommands: config.commands,
        allHelps: config.helps,
        actualCmd: null,
        isRunningCommand: false,
    }
    
    const reducer = (state: TerminalCommandState, action: {type: string, value: any}) => {
        switch (action.type) {
            case 'isRunningCommand':
                return {...state, isRunningCommand: action.value};
            ;
            case 'setActualCmd':
                return {...state, actualCmd: action.value};
            default:
                return state;
        }
    }

    const [state, dispatch] = useReducer(reducer, terminalCommandInitialState)

    return (
        <TerminalCommandContext.Provider value={{state, action}}>
            {children}
        </TerminalCommandContext.Provider>
    )
}

export const useTerminalCommand = () => {
    const ctx = useContext(TerminalCommandContext);

    if (ctx === undefined) {
        throw new Error(`useTerminalCommand must be used within a TerminalCommandContextProvider.`)
    }

    return ctx
}