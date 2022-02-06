/// <reference types="react" />
import { TerminalColors } from "../components/Terminal";
import { FakeCommand, Help } from "../contexts/CommandContext";
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
    messages: TerminalMessages;
}
export interface TerminalMessages {
    toBeImplemented: string[];
    notFound: string[];
    cantBeExecuted: string[];
    initialOutput: string[];
}
export interface TerminalCommandConfig {
    commands: FakeCommand[];
    helps?: Help[];
}
export interface TerminalDefaults {
    shouldPersisteData: boolean;
    loadingScreen: TerminalLoadingScreen;
    terminal: TerminalConfig;
}
export declare const defaults: TerminalDefaults;
