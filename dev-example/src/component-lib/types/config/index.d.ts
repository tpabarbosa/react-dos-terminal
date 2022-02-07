/// <reference types="react" />
import { TerminalColors } from "../components/Terminal";
import { FakeCommand } from "../contexts/CommandContext";
export declare type TerminalLoadingScreenOptions = 'always' | 'never' | 'first-time';
export interface TerminalLoadingScreen {
    shouldShow: TerminalLoadingScreenOptions;
    messageOrElement: string | string[] | JSX.Element;
    loadingTime: number;
}
export interface TerminalConfig {
    colors: TerminalColors;
    screenStripes: boolean;
    autoFocus: boolean;
}
export interface TerminalCommandsMessages {
    toBeImplemented: string;
    notFound: string;
    cantBeExecuted: string;
    helpNotAvailable: string;
}
export interface TerminalCommandsConfig {
    commands: FakeCommand[];
    excludeCommands: string[] | 'all';
    shouldAllowHelp: boolean;
    messages: TerminalCommandsMessages;
}
export interface TerminalDefaults {
    shouldPersisteData: boolean;
    loadingScreen: TerminalLoadingScreen;
    terminal: TerminalConfig;
    commands: TerminalCommandsConfig;
    initialOutput: string[];
}
export declare const defaults: TerminalDefaults;
