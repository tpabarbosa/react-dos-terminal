/// <reference types="react" />
import { TerminalColors } from "../components/Terminal";
import { TerminalCommandConfig } from "../config";
export interface FakeCommand {
    name: string;
    alias?: string | string[];
    action: (props: CommandProps) => Command | Promise<Command>;
    async?: {
        waitingMessage?: string[];
    };
}
export interface CommandProps {
    name: string;
    args: string;
    help?: string[];
    allCommands: FakeCommand[];
}
export declare type CommandToOutput = {
    action: 'clear';
} | {
    action: 'add';
    value: string | string[];
} | {
    action: 'remove';
    value: number;
};
export declare type CommandToConfigTerminal = {
    config: 'colors';
    value: TerminalColors;
} | {
    config: 'actualDir';
    value: string;
};
export interface Command {
    dynamic?: {
        element: JSX.Element;
        options?: {
            shouldHideTerminalOutput?: boolean;
        };
    };
    output?: CommandToOutput[];
    configTerminal?: CommandToConfigTerminal;
}
export interface TerminalCommand extends Command {
    name: string;
    args: string;
    waitingMessage?: string[];
}
export interface TerminalCommandContextAPI {
    state: TerminalCommandState;
    action: {
        startRunningCommand: () => void;
        endRunningCommand: () => void;
        setActualCmd: (cmd: TerminalCommand | null) => void;
    };
}
export interface Help {
    command: string;
    text: string[];
}
export interface TerminalCommandState {
    allCommands: FakeCommand[];
    allHelps?: Help[];
    actualCmd?: TerminalCommand | null;
    isRunningCommand: boolean;
}
export interface TerminalCommandProviderProps {
    children: React.ReactNode;
    config: TerminalCommandConfig;
}
export declare const TerminalCommandContextProvider: ({ children, config }: TerminalCommandProviderProps) => JSX.Element;
export declare const useTerminalCommand: () => TerminalCommandContextAPI;
