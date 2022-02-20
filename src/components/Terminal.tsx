import React from 'react'
import { TerminalDefaults } from '../config'
import { TerminalContextProvider } from '../contexts/TerminalContext'
import { AllowedColors } from '../helpers/colors'
import { useInitializer } from '../hooks/useInitializer'
import { useLoadingScreen } from '../hooks/useLoadingScreen'
import { useOutputHandler } from '../hooks/useOutputHandler'
import GlobalStyles from '../styles/GlobalStyles'
import { Main } from './Main'
import Output from './Output'
import { TerminalScreen } from './TerminalScreen'

import { UserDefinedElement } from './UserDefinedElement'
import { CommandContextProvider } from '../contexts/CommandContext'
import { FileSystemContextProvider } from '../contexts/FileSystemContext'
import { LocalStorageContextProvider } from '../contexts/LocalStorageContext'

// type Data<T extends string> = { [field in T]: string | {} | null | object };

type Colors<T extends string> = { [field in T]: AllowedColors }
export type TerminalColors = Colors<'background' | 'color'>

interface TerminalProps {
    config?: Partial<TerminalDefaults>
}

interface TerminalPropsWithId extends TerminalProps {
    id: string
}

const LoadingScreen = ({
    content,
}: {
    content: string | string[] | JSX.Element
}) => {
    const getContent = (): string[] => {
        if (!React.isValidElement(content)) {
            if (typeof content === 'string') {
                return [content]
            }
            return content as string[]
        }
        return [] as string[]
    }

    const output = useOutputHandler({
        initialOutput: getContent(),
        shouldTypewrite: true,
    })

    return (
        <TerminalScreen>
            {!React.isValidElement(content) && (
                <Output>
                    <Output.Typewriter output={output} flashing />
                </Output>
            )}
            {React.isValidElement(content) && (
                <UserDefinedElement element={content} />
            )}
        </TerminalScreen>
    )
}

const InitializeTerminal = ({ config }: TerminalProps) => {
    const initializer = useInitializer(config)
    const loadingScreen = useLoadingScreen(config?.loadingScreen)

    return (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>
            {initializer.isInitialized && (
                <>
                    <GlobalStyles />
                    <TerminalContextProvider config={initializer.terminal}>
                        {!loadingScreen.isLoading && (
                            <FileSystemContextProvider
                                config={initializer.fileSystem}
                            >
                                <CommandContextProvider
                                    config={initializer.commands}
                                >
                                    <Main />
                                </CommandContextProvider>
                            </FileSystemContextProvider>
                        )}
                        {loadingScreen.isLoading && (
                            <LoadingScreen content={loadingScreen.content} />
                        )}
                    </TerminalContextProvider>
                </>
            )}
        </>
    )
}

const Terminal = ({ config, id }: TerminalPropsWithId) => {
    if (id === '') {
        throw new Error(`Id can not be empty`)
    }
    return (
        <React.StrictMode>
            <LocalStorageContextProvider id={id}>
                <InitializeTerminal config={config} />
            </LocalStorageContextProvider>
        </React.StrictMode>
    )
}

export default Terminal
