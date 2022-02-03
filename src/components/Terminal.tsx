import React, { useEffect } from "react";
import { defaults, TerminalDefaults,  } from "../config";
import ls, { Value } from "../helpers/localStorage";
import { useLoadingScreen } from "../hooks/useLoadingScreen";
import GlobalStyles from "../styles/GlobalStyles";
import { Main } from "./Main";
import Output from "./Output";
import { TerminalScreen } from "./TerminalScreen";

import { UserDefinedComponent } from "./UserDefinedComponent";

const allowedColors = [
    '#000000', 
    '#0000aa', 
    '#00aa00', 
    '#00aaaa', 
    '#aa0000', 
    '#aa00aa', 
    '#aa5500', 
    '#aaaaaa', 
    '#555555', 
    '#5555ff', 
    '#55ff55', 
    '#55ffff', 
    '#ff5555', 
    '#ff55ff', 
    '#ffff55', 
    '#ffffff'
] as const

type AllowedColors = typeof allowedColors[number];

export interface TerminalColors {
    background: AllowedColors;
    color: AllowedColors;
}

interface TerminalProps {
    config: Partial<TerminalDefaults>;
}

const Terminal = ({config}: TerminalProps) => {

    const loadingScreen = useLoadingScreen(config?.loadingScreen);
    
    const isInstalled = ls.get('i');
    const shouldPersisteData = config?.shouldPersisteData !== undefined ? config.shouldPersisteData : defaults.shouldPersisteData

    useEffect(() => {
        if ((isInstalled === null || isInstalled === '0') || !shouldPersisteData) {
            const colors: unknown = config?.colors ? config.colors : defaults.colors
            const toLS = colors as Value;
            const stripes = (config?.screenStripes !== undefined ? config?.screenStripes : defaults.screenStripes)
            ls.set('stripes', stripes ? '1' : '0');
            ls.set('colors', toLS);
            ls.set('i', '1');
        }
    },[])


    return (
        <React.StrictMode>
            <GlobalStyles />
            
            {!loadingScreen.isLoading &&
                // <TerminalContextProvider>
                    <Main />
                // </TerminalContextProvider>
            }
            
            {loadingScreen.isLoading && !React.isValidElement(loadingScreen.content) &&
                <TerminalScreen >
                    <Output>
                        <Output.Print typewriter={true} flashing={true} output={loadingScreen.content as string | string[]} />
                    </Output>
                </TerminalScreen>
            }
            {loadingScreen.isLoading && React.isValidElement(loadingScreen.content)&&
                <UserDefinedComponent component={loadingScreen.content}/>
            }

        </React.StrictMode>
    )
}


export default Terminal;