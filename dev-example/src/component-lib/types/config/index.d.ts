/// <reference types="react" />
import { TerminalColors } from "../components/Terminal";
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
export interface MainOutputConfig {
    initialMessage: string | string[];
}
export interface TerminalDefaults extends MainOutputConfig {
    shouldPersisteData: boolean;
    loadingScreen: TerminalLoadingScreen;
    terminal: TerminalConfig;
}
export declare const defaults: TerminalDefaults;
