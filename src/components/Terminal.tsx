import React from "react";
import { TerminalDefaults } from "../config";
import { TerminalContextProvider } from "../contexts/TerminalContext";
import { AllowedColors } from "../helpers/colors";
import { useInitializer } from "../hooks/useInitializer";
import { useLoadingScreen } from "../hooks/useLoadingScreen";
import { useOutput } from "../hooks/useOutput";
import GlobalStyles from "../styles/GlobalStyles";
import { Main } from "./Main";
import Output from "./Output";
import { TerminalScreen } from "./TerminalScreen";

import { UserDefinedElement } from "./UserDefinedElement";

//type Data<T extends string> = { [field in T]: string | {} | null | object };

type Colors<T extends string> = { [field in T]: AllowedColors };
export type TerminalColors = Colors<'background' | 'color'> 

interface TerminalProps {
    config: Partial<TerminalDefaults>;
}

const Terminal = ({config}: TerminalProps) => {

    const initializer = useInitializer(config?.shouldPersisteData, config?.terminal);
    const loadingScreen = useLoadingScreen(config?.loadingScreen);
    
    return (
        <React.StrictMode>
            {initializer.isInitialized &&
            <>
            <GlobalStyles />
            <TerminalContextProvider config={initializer.terminal}>
                {!loadingScreen.isLoading &&
                    <Main />
                }
                {loadingScreen.isLoading &&
                    <LoadingScreen content={loadingScreen.content}/>
                }
            </TerminalContextProvider>
            </> 
            }
        </React.StrictMode>
    )
}

const LoadingScreen = ({content}: {content: string | string[] | JSX.Element}) => {

    const output = useOutput();

    return (
        <>
        {!React.isValidElement(content) &&
            <TerminalScreen>
                <Output >
                    <Output.Print 
                        typewriter={output.typewriter} 
                        flashing={true} 
                        output={content as string | string[]} />
                </Output>
            </TerminalScreen>
        }
        {React.isValidElement(content)&&
            <UserDefinedElement element={content}/>
        }
        </>
    )
}

export default Terminal;