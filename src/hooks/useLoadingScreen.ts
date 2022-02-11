import { useEffect, useMemo, useState } from 'react'
import { defaults, TerminalLoadingScreen } from '../config'
import ls from '../helpers/localStorage'

export interface UseLoadingScreen {
    isLoading: boolean
    content: string | string[] | JSX.Element
}

export const useLoadingScreen = (
    config: Partial<TerminalLoadingScreen> | undefined
): UseLoadingScreen => {
    const shouldShowLoading = (
        loadingScreen: Partial<TerminalLoadingScreen>,
        isInstalled: string | null
    ) => {
        const ss = loadingScreen.showLoadingScreen ?? 'first-time'
        switch (ss) {
            case 'always':
                return true
            case 'never':
                return false
            case 'first-time':
                return isInstalled !== '1'
            default:
                return isInstalled !== '1'
        }
    }

    const isInstalled = ls.get('i') as string

    const loadingScreen: TerminalLoadingScreen = useMemo(() => {
        return {
            ...defaults.loadingScreen,
            ...config,
        } as TerminalLoadingScreen
    }, [config])

    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const finishLoading = () => {
            setIsLoading(false)
        }

        if (!isLoading && shouldShowLoading(loadingScreen, isInstalled)) {
            setIsLoading(true)
            setTimeout(finishLoading, loadingScreen.loadingTime)
        }
    }, [])

    return {
        isLoading,
        content: loadingScreen.messageOrElement,
    }
}
