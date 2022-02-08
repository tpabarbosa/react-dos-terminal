import { createContext, useContext, useMemo, useReducer } from "react"
import ls from "../helpers/localStorage"
import { FakeCommand } from "./CommandContext"


export type FakeAttributes = 'r' | 'rh'| 'w' | 'wh' | 's' | 'sh';
export type FakeFileTypes = 'file' | 'directory' | 'exec-file' | 'system-file';
export type FakeFileTypesAbr = 'f' | 'd' | 'e' | 's';

export interface FakeFile {
    name: string;
    type: FakeFileTypes;
    content: string| string[] | FakeFile[] | FakeCommand;
    attributes: FakeAttributes; 
    fakeFileSize?: number,
}

export type FakeFileSystem = {
    files: {
        [name: string]: {
            c: string | string[] | FakeFileSystem | FakeCommand; 
            a: FakeAttributes,
            t: FakeFileTypesAbr;
            s: number;
        }
    },
    totalSize: number;
}
export interface FileSystemContextAPI {
    state: FileSystemState,
    action: {
        setFiles: (files: FakeFileSystem) => void,
        setActualDir: (value: string) => void,
    }
}

export interface FileSystemState {
    actualDir: string,
    allFiles: FakeFileSystem,
}

export interface FileSystemProviderProps {
    children: React.ReactNode,
    config: FileSystemState,
}

const FileSystemContext = createContext<FileSystemContextAPI | undefined>(undefined)

export const FileSystemContextProvider = ({children, config}: FileSystemProviderProps) => {

    const action = useMemo(() => {return {
        setFiles: (files: FakeFileSystem) => {
            dispatch({type: 'files', value: files})
        },
        setActualDir: (value: string) => {
            dispatch({type: 'setDir', value})
        },
    }}, [])
    
    const fileSystemInitialState: FileSystemState = {
        actualDir: config.actualDir,
        allFiles: config.allFiles,
    }
    
    const reducer = (state: FileSystemState, action: {type: string, value: any}) => {
        switch (action.type) {
            case 'setDir': 
                ls.set('actualDir', action.value)
                return {...state, actualDir: action.value};
            case 'files':
                return {...state, files: action.value};
            default:
                return state;
        }
    }

    const [state, dispatch] = useReducer(reducer, fileSystemInitialState)

    return (
        <FileSystemContext.Provider value={{state, action}}>
            {children}
        </FileSystemContext.Provider>
    )
}

export const useFileSystem = () => {
    const ctx = useContext(FileSystemContext);

    if (ctx === undefined) {
        throw new Error(`useFileSystem must be used within a FileSystemContextProvider.`)
    }

    return ctx
}