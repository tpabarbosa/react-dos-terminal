/// <reference types="react" />
import { TerminalColors } from "../components/Terminal";
import { TerminalConfig } from "../config";
export interface TerminalContextAPI {
    state: TerminalState;
    action: {
        setColors: (colors: TerminalColors) => void;
        userHasInteracted: () => void;
    };
}
export interface TerminalState {
    colors: TerminalColors;
    screenStripes: boolean;
    autoFocus: boolean;
    isActive: boolean;
    initialMessage: string | string[];
}
export declare type TerminalProviderProps = {
    children: React.ReactNode;
    config: TerminalConfig;
};
export declare const TerminalContextProvider: ({ children, config }: TerminalProviderProps) => JSX.Element;
export declare const useTerminal: () => TerminalContextAPI;
