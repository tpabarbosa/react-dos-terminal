import React, { createContext, useContext, useMemo, useReducer } from 'react'
import ls from '../helpers/localStorage'
import { FakeCommand } from './CommandContext'

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
    setActualDir: (value: string) => void
}

export interface FileSystemState extends FakeFileSystem {
    actualDir: string
}

export interface FileSystemProviderProps {
    children: React.ReactNode
    config: FileSystemState
}

export type FileSystemAction =
    | { type: 'setActualDir'; value: string }
    | { type: 'setFiles'; value: FakeFileSystem }

const FileSystemContext = createContext<FileSystemContextAPI | undefined>(
    undefined
)

export const FileSystemContextProvider = ({
    children,
    config,
}: FileSystemProviderProps): JSX.Element => {
    const fileSystemInitialState: FileSystemState = {
        actualDir: config.actualDir,
        files: config.files,
        totalSize: config.totalSize,
    }

    const reducer = (state: FileSystemState, action: FileSystemAction) => {
        switch (action.type) {
            case 'setActualDir':
                ls.set('actualDir', action.value)
                return { ...state, actualDir: action.value }
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
            setActualDir: (value: string) => {
                dispatch({ type: 'setActualDir', value })
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
