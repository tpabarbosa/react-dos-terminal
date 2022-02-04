import { createContext, useContext, useMemo, useReducer } from "react"
import { MainOutputConfig } from "../config"

export interface MainOutputContextAPI {
    state: MainOutputState,
    action: {
        addLines: (output: string | string[]) => void,
        delLastLines: (number: number) => void,
        clear: () => void,
    }
}

export interface MainOutputState {
    data: string[];
}

export type MainOutputProviderProps = {
    children: React.ReactNode,
    config: MainOutputConfig,
}

const MainOutputContext = createContext<MainOutputContextAPI | undefined>(undefined)

export const MainOutputContextProvider = ({children, config}: MainOutputProviderProps) => {
    
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
    
    const outputInitialState: MainOutputState = {
        data: typeof config.initialMessage === 'string' ? [config.initialMessage] : config.initialMessage,
    }
    
    const reducer = (state: MainOutputState, action: {type: string, value: any}) => {
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
        <MainOutputContext.Provider value={{state, action}}>
            {children}
        </MainOutputContext.Provider>
    )
}

export const useMainOutput = () => {
    const ctx = useContext(MainOutputContext);

    if (ctx === undefined) {
        throw new Error(`useOutput must be used within a OutputContextProvider.`)
    }

    return ctx
}