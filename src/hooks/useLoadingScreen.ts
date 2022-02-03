import { useEffect, useState } from "react";
import { defaults, TerminalLoadingScreen } from "../config";
import ls from "../helpers/localStorage";

export const useLoadingScreen = (config: TerminalLoadingScreen | undefined) => {

        const shouldShowLoading = (loadingScreen: TerminalLoadingScreen, isInstalled: string | null) => {
        switch (loadingScreen.shouldShow) {
            case 'always':
                return true;
            case 'never': 
                return false;
            case 'first-time': 
                return isInstalled !== '1'
        }
    }

    const isInstalled = ls.get('i') as string;


    const loadingScreen: TerminalLoadingScreen = {...defaults.loadingScreen, ...config}

    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        
        const finishLoading = () => {
            setIsLoading(false)
        }
        
        if (!isLoading && shouldShowLoading(loadingScreen, isInstalled)) {
            setIsLoading(true);
            setTimeout(finishLoading, loadingScreen.loadingTime)
        }
    }, [])

    return {
        isLoading,
        content: loadingScreen.messageOrElement,
    }
}