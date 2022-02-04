import { createContext, useContext, useMemo, useReducer } from "react"
import { TerminalOutputConfig } from "../config"

export interface TerminalOutputContextAPI {
    state: TerminalOutputState,
    action: {
        addLines: (output: string | string[]) => void,
        delLastLines: (number: number) => void,
        clear: () => void,
    }
}

export interface TerminalOutputState {
    data: string[];
}

export type TerminalOutputProviderProps = {
    children: React.ReactNode,
    config: TerminalOutputConfig,
}

const TerminalOutputContext = createContext<TerminalOutputContextAPI | undefined>(undefined)

export const TerminalOutputContextProvider = ({children, config}: TerminalOutputProviderProps) => {
    
    const action = useMemo(() => {return {
        addLines: (output: string | string[]) => {
            dispatch({type: 'output', value: output})
        },
        delLastLines: (number: number) => {
            dispatch({type: 'outputDelLines', value: number})
        },
        clear: () => {
            dispatch({type: 'output', value: null})
        },
    }}, [])
    
    const outputInitialState: TerminalOutputState = {
        data: typeof config.initialMessage === 'string' ? [config.initialMessage] : config.initialMessage,
    }
    
    const reducer = (state: TerminalOutputState, action: {type: string, value: any}) => {
        switch (action.type) {
            case 'output': {
                if (action.value === null) {
                    return {...state, data: []}
                }
                if (typeof action.value === 'string') {
                    return {...state, data: [...state.data, action.value]};
                } 
                if (typeof action.value === 'object') {
                    return {...state, data: [...state.data, ...action.value]};
                }
                return state
            }
            case 'outputDelLines': {
                const newOutput = state.data.slice(0, - action.value);
                return {...state, output: newOutput};
            }
            default:
                return state;
        }
    }

    const [state, dispatch] = useReducer(reducer, outputInitialState)

    return (
        <TerminalOutputContext.Provider value={{state, action}}>
            {children}
        </TerminalOutputContext.Provider>
    )
}

export const useTerminalOutput = () => {
    const ctx = useContext(TerminalOutputContext);

    if (ctx === undefined) {
        throw new Error(`useTerminalOutput must be used within a TerminalOutputContextProvider.`)
    }

    return ctx
}