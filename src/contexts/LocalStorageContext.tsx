import React, { createContext, useCallback, useContext, useMemo } from 'react'

export type Value = {
    [item: string]: string | null | object
}

type Storage = {
    [key: string]: Value | string
}

export interface LocalStorageContextAPI {
    set: (key: string, value: Value | string) => void
    get: (key: string) => Value | string | null
    getLSFreeSize: () => string
}

const LocalStorageContext = createContext<LocalStorageContextAPI | undefined>(
    undefined
)

export interface LocalStorageProviderProps {
    children: React.ReactNode
    id: string
}

export const LocalStorageContextProvider = ({
    children,
    id,
}: LocalStorageProviderProps) => {
    const localStorageKey = `react-dos-terminal@${id}`
    const setToLS = useCallback(
        (key: string, value: Value | string) => {
            const stored = window.localStorage.getItem(localStorageKey)
            let obj: Storage = {}
            if (stored) {
                obj = JSON.parse(stored)
            }
            obj[key] = value
            window.localStorage.setItem(localStorageKey, JSON.stringify(obj))
        },
        [localStorageKey]
    )

    const getFromLS = useCallback(
        (key: string): Value | string | null => {
            const value = window.localStorage.getItem(localStorageKey)
            let obj: Storage = {}
            if (value) {
                obj = JSON.parse(value)
                if (obj) {
                    return obj[key]
                }
            }
            return null
        },
        [localStorageKey]
    )

    const getLSFreeSize = useCallback(() => {
        let lsTotal = 0
        let xLen
        Object.keys(localStorage).forEach((x) => {
            if (Object.prototype.hasOwnProperty.call(localStorage, x)) {
                xLen = (localStorage[x].length + x.length) * 2
                lsTotal += xLen
            }
        })

        return (5000000 - lsTotal).toLocaleString('en-US', {
            minimumFractionDigits: 0,
        })
    }, [])

    const ls = useMemo(() => {
        return {
            set: setToLS,
            get: getFromLS,
            getLSFreeSize,
        }
    }, [getFromLS, getLSFreeSize, setToLS])

    return (
        <LocalStorageContext.Provider value={ls}>
            {children}
        </LocalStorageContext.Provider>
    )
}

export const useLocalStorage = () => {
    const ctx = useContext(LocalStorageContext)

    if (ctx === undefined) {
        throw new Error(
            `useLocalStorage must be used within a LocalStorageContextProvider.`
        )
    }

    return ctx
}
