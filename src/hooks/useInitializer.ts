
import { useEffect, useState } from "react";
import { TerminalColors } from "../components/Terminal";
import { defaults, TerminalConfig } from "../config";
import ls from "../helpers/localStorage";

export const useInitializer = (shouldPersisteData: boolean | undefined, config: TerminalConfig | undefined) => {

    const isInstalled = ls.get('i');
    const [isInitialized, setIsInitialized] = useState<boolean>(false);

    const persisteData = shouldPersisteData !== undefined ? shouldPersisteData : defaults.shouldPersisteData;

    const [finalColors, setFinalColors] = useState<TerminalColors>(defaults.terminal.colors);
    
    const [finalStripes, setFinalStripes] = useState<boolean>(defaults.terminal.screenStripes);

    const finalAutofocus = config?.autoFocus !== undefined ? config.autoFocus : defaults.terminal.autoFocus;

    useEffect(() => {
        let col: TerminalColors;
        let strip: boolean;
        if ((isInstalled === null || isInstalled === '0') || !persisteData) {
            col = config?.colors ? config?.colors : defaults.terminal.colors
            strip = (config?.screenStripes !== undefined ? config?.screenStripes : defaults.terminal.screenStripes);
            ls.set('stripes', strip ? '1' : '0');
            ls.set('colors', col);
            ls.set('i', '1');
        }
        else {
            col = ls.get('colors') as TerminalColors;
            strip = ls.get('stripes')==='1' ? true : false;
        }

        setFinalColors(col);
        setFinalStripes(strip);
        setIsInitialized(true);
    },[])

    return {
        terminal: {
            colors: finalColors,
            screenStripes: finalStripes,
            autoFocus: finalAutofocus,
        },
        isInitialized
    }
}