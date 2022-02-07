import { createContext, useContext, useMemo, useReducer } from "react"
import { TerminalColors } from "../components/Terminal"
import { TerminalConfig } from "../config"
import ls from "../helpers/localStorage"

export interface TerminalContextAPI {
    state: TerminalState,
    action: {
        setConfig: ({config, value}: {config: string, value: any}) => void
        userHasInteracted: () => void;
    }
}

export interface TerminalState {
    colors: TerminalColors,
    screenStripes: boolean,
    autoFocus: boolean,
    isActive: boolean,
}

export interface TerminalProviderProps {
    children: React.ReactNode,
    config: TerminalConfig,
}

const TerminalContext = createContext<TerminalContextAPI | undefined>(undefined)

export const TerminalContextProvider = ({children, config}: TerminalProviderProps) => {

    const action = useMemo(() => {return {
        userHasInteracted: () => {
            dispatch({type: 'isActive', value: true})
        },
        setConfig: ({config, value}: {config: string, value: any}) => {
            if (config==='colors') {
                dispatch({type: 'setColors', value})
            }
        }

    }}, [])
    
    const terminalInitialState: TerminalState = {
        colors: config.colors,
        screenStripes: config.screenStripes,
        autoFocus: config.autoFocus,
        isActive: config.autoFocus,
    }
    
    const reducer = (state: TerminalState, action: {type: string, value: any}) => {
        switch (action.type) {
            case 'isActive':
                return {...state, isActive: action.value};
            case 'setColors': 
                ls.set('colors', action.value)
                return {...state, config: action.value};
            default:
                return state;
        }
    }

    const [state, dispatch] = useReducer(reducer, terminalInitialState)

    return (
        <TerminalContext.Provider value={{state, action}}>
            {children}
        </TerminalContext.Provider>
    )
}

export const useTerminal = () => {
    const ctx = useContext(TerminalContext);

    if (ctx === undefined) {
        throw new Error(`useTerminal must be used within a TerminalContextProvider.`)
    }

    return ctx
}