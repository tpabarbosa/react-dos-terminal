import React, { createContext, useContext, useMemo, useReducer } from 'react'
import { TerminalColors } from '../components/Terminal'
import { TerminalConfig } from '../config'
import ls from '../helpers/localStorage'

export type TerminalConfigAction =
    | { config: 'setColors'; value: TerminalColors }
    | { config: 'isActive'; value: boolean }

export interface TerminalContextAPI extends TerminalState {
    setConfig: ({ config, value }: TerminalConfigAction) => void
    userHasInteracted: () => void
}

export interface TerminalState {
    colors: TerminalColors
    showOldScreenEffect: boolean
    autoFocus: boolean
    isActive: boolean
}

export interface TerminalProviderProps {
    children: React.ReactNode
    config: TerminalConfig
}

const TerminalContext = createContext<TerminalContextAPI | undefined>(undefined)

export const TerminalContextProvider = ({
    children,
    config,
}: TerminalProviderProps) => {
    const terminalInitialState: TerminalState = {
        colors: config.colors,
        showOldScreenEffect: config.showOldScreenEffect,
        autoFocus: config.autoFocus,
        isActive: config.autoFocus,
    }

    const reducer = (state: TerminalState, action: TerminalConfigAction) => {
        switch (action.config) {
            case 'isActive':
                return { ...state, isActive: action.value }
            case 'setColors':
                ls.set('colors', action.value)
                return { ...state, colors: action.value }
            default:
                return state
        }
    }

    const [state, dispatch] = useReducer(reducer, terminalInitialState)

    const t = useMemo(() => {
        return {
            ...state,
            userHasInteracted: () => {
                dispatch({ config: 'isActive', value: true })
            },
            setConfig: (conf: TerminalConfigAction) => {
                if (conf.config === 'setColors') {
                    dispatch({ config: 'setColors', value: conf.value })
                }
            },
        }
    }, [state])

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
