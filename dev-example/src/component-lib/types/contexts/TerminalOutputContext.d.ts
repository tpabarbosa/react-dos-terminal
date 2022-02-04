/// <reference types="react" />
import { TerminalOutputConfig } from "../config";
export interface TerminalOutputContextAPI {
    state: TerminalOutputState;
    action: {
        addLines: (output: string | string[]) => void;
        delLastLines: (number: number) => void;
        clear: () => void;
    };
}
export interface TerminalOutputState {
    data: string[];
}
export declare type TerminalOutputProviderProps = {
    children: React.ReactNode;
    config: TerminalOutputConfig;
};
export declare const TerminalOutputContextProvider: ({ children, config }: TerminalOutputProviderProps) => JSX.Element;
export declare const useTerminalOutput: () => TerminalOutputContextAPI;
