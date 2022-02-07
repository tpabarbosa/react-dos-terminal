import { createContext, useContext, useMemo, useReducer } from "react"
import ls from "../helpers/localStorage"

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
    config: FileSystemConfig,
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
        allFiles: config.files,
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