import React, { createContext, useContext, useMemo, useReducer } from 'react'
import { FakeCommand } from './CommandContext'
import { useLocalStorage } from './LocalStorageContext'

export type FakeAttribute = 'r' | 'rh' | 'w' | 'wh' | 'p' | 'ph'
export type FakeFileType =
    | 'text/plain'
    | 'directory'
    | 'application/executable'
    | 'application/system'

export interface FakeFile {
    name: string
    type: FakeFileType
    content: string | string[] | FakeFile[] | FakeCommand
    attributes: FakeAttribute
    size?: number
}

export type FakeFileSystem = {
    files: FakeFile[]
    totalSize: number
}
export interface FileSystemContextAPI extends FileSystemState {
    setFiles: (files: FakeFileSystem) => void
    setCurrentDir: (value: string) => void
}

export interface FileSystemState extends FakeFileSystem {
    currentDir: string
    systemPaths: string[]
}

export interface FileSystemProviderProps {
    children: React.ReactNode
    config: FileSystemState
}

export type FileSystemAction =
    | { type: 'setCurrentDir'; value: string }
    | { type: 'setFiles'; value: FakeFileSystem }

const FileSystemContext = createContext<FileSystemContextAPI | undefined>(
    undefined
)

export const FileSystemContextProvider = ({
    children,
    config,
}: FileSystemProviderProps): JSX.Element => {
    const ls = useLocalStorage()

    const fileSystemInitialState: FileSystemState = {
        currentDir: config.currentDir,
        files: config.files,
        totalSize: config.totalSize,
        systemPaths: config.systemPaths,
    }

    const reducer = (state: FileSystemState, action: FileSystemAction) => {
        switch (action.type) {
            case 'setCurrentDir':
                ls.set('currentDir', action.value)
                return { ...state, currentDir: action.value }
            case 'setFiles':
                return { ...state, allFiles: action.value }
            default:
                return state
        }
    }

    const [state, dispatch] = useReducer(reducer, fileSystemInitialState)

    const fs = useMemo(() => {
        return {
            ...state,
            setFiles: (files: FakeFileSystem) => {
                dispatch({ type: 'setFiles', value: files })
            },
            setCurrentDir: (value: string) => {
                dispatch({ type: 'setCurrentDir', value })
            },
        }
    }, [state])

    return (
        <FileSystemContext.Provider value={fs}>
            {children}
        </FileSystemContext.Provider>
    )
}

export const useFileSystem = () => {
    const ctx = useContext(FileSystemContext)

    if (ctx === undefined) {
        throw new Error(
            `useFileSystem must be used within a FileSystemContextProvider.`
        )
    }

    return ctx
}
