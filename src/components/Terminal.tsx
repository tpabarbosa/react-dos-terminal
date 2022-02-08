import React from "react";
import { defaults, TerminalDefaults } from "../config";
import { TerminalContextProvider } from "../contexts/TerminalContext";
import { AllowedColors } from "../helpers/colors";
import { useInitializer } from "../hooks/useInitializer";
import { useLoadingScreen } from "../hooks/useLoadingScreen";
import { useOutputHandler } from "../hooks/useOutputHandler";
import GlobalStyles from "../styles/GlobalStyles";
import { Main } from "./Main";
import Output from "./Output";
import { TerminalScreen } from "./TerminalScreen";

import { UserDefinedElement } from "./UserDefinedElement";
import { TerminalCommandContextProvider } from "../contexts/CommandContext";
import { FileSystemContextProvider } from "../contexts/FileSystemContext";

//type Data<T extends string> = { [field in T]: string | {} | null | object };

type Colors<T extends string> = { [field in T]: AllowedColors };
export type TerminalColors = Colors<'background' | 'color'> 

interface TerminalProps {
    config: Partial<TerminalDefaults>;
}

const Terminal = ({config}: TerminalProps) => {

    const initializer = useInitializer(config);
    const loadingScreen = useLoadingScreen(config?.loadingScreen);
    
    const initialOutput = config?.initialOutput !== undefined  ? 
            config.initialOutput : defaults.initialOutput;

    
    return (
        <React.StrictMode>
            {initializer.isInitialized &&
            <>
            <GlobalStyles />
            <TerminalContextProvider config={initializer.terminal}>
                {!loadingScreen.isLoading &&
                    <FileSystemContextProvider config={initializer.fileSystem}>
                        <TerminalCommandContextProvider config={initializer.commands}>
                            <Main initialOutput={initialOutput}/>
                        </TerminalCommandContextProvider>
                    </FileSystemContextProvider>
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

    const getContent = (): string[] => {
        if (!React.isValidElement(content)) {
            if (typeof content === 'string') {
                return [content]
            } else {
                return content as string[]
            }
        }
        return [] as string[]
    }

    const output = useOutputHandler(getContent());

    return (
        <>
        {!React.isValidElement(content) &&
            <TerminalScreen>
                <Output >
                    <Output.Typewriter 
                        output={output}
                        flashing={true} 
                    />
                    
                </Output>
            </TerminalScreen>
        }
        {React.isValidElement(content)&&
            <UserDefinedElement element={content} outputHandler={output}/>
        }
        </>
    )
}

export default Terminal;