import React, { createContext, useContext, useMemo, useReducer } from 'react'
import { TerminalColors } from '../components/Terminal'
import { TerminalConfig } from '../config'
import ls from '../helpers/localStorage'
import { useOutputHandler, UseOutputHandler } from '../hooks/useOutputHandler'

export type TerminalConfigAction =
    | { config: 'setColors'; value: TerminalColors }
    | { config: 'isActive'; value: boolean }
    | { config: 'setPrompt'; value: string }

export interface TerminalContextAPI extends TerminalState {
    output: UseOutputHandler
    setConfig: ({ config, value }: TerminalConfigAction) => void
    userHasInteracted: () => void
}

export interface TerminalState {
    colors: TerminalColors
    showOldScreenEffect: boolean
    autoFocus: boolean
    isActive: boolean
    currentPrompt: string
    defaultPrompt: string
}

export interface TerminalProviderProps {
    children: React.ReactNode
    config: TerminalConfig & { currentPrompt: string }
}

const TerminalContext = createContext<TerminalContextAPI | undefined>(undefined)

export const TerminalContextProvider = ({
    children,
    config,
}: TerminalProviderProps) => {
    const output = useOutputHandler({
        initialOutput: config.initialOutput,
        shouldTypewrite: config.shouldTypewrite,
    })

    const terminalInitialState: TerminalState = {
        colors: config.colors,
        showOldScreenEffect: config.showOldScreenEffect,
        autoFocus: config.autoFocus,
        isActive: config.autoFocus,
        currentPrompt: config.currentPrompt,
        defaultPrompt: config.defaultPrompt,
    }

    const reducer = (state: TerminalState, action: TerminalConfigAction) => {
        switch (action.config) {
            case 'isActive':
                return { ...state, isActive: action.value }
            case 'setColors':
                ls.set('colors', action.value)
                return { ...state, colors: action.value }
            case 'setPrompt':
                ls.set('prompt', action.value)
                return { ...state, currentPrompt: action.value }
            default:
                return state
        }
    }

    const [state, dispatch] = useReducer(reducer, terminalInitialState)

    const t = useMemo(() => {
        return {
            ...state,
            output,
            userHasInteracted: () => {
                dispatch({ config: 'isActive', value: true })
            },
            setConfig: (conf: TerminalConfigAction) => {
                if (conf.config === 'setColors') {
                    dispatch({ config: 'setColors', value: conf.value })
                }
                if (conf.config === 'setPrompt') {
                    dispatch({
                        config: 'setPrompt',
                        value:
                            conf.value !== ''
                                ? conf.value
                                : terminalInitialState.defaultPrompt,
                    })
                }
            },
        }
    }, [state, output, terminalInitialState.defaultPrompt])

    return (
        <TerminalContext.Provider value={t}>
            {children}
        </TerminalContext.Provider>
    )
}

export const useTerminal = () => {
    const ctx = useContext(TerminalContext)

    if (ctx === undefined) {
        throw new Error(
            `useTerminal must be used within a TerminalContextProvider.`
        )
    }

    return ctx
}
