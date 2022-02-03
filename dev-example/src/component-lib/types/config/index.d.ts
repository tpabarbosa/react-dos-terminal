/// <reference types="react" />
import { TerminalColors } from "../components/Terminal";
export declare type TerminalLoadingScreenOptions = 'always' | 'never' | 'first-time';
export interface TerminalLoadingScreen {
    shouldShow: TerminalLoadingScreenOptions;
    messageOrElement: string | string[] | JSX.Element;
    loadingTime: number;
}
export interface TerminalDefaults {
    colors: TerminalColors;
    screenStripes: boolean;
    loadingScreen: TerminalLoadingScreen;
    shouldPersisteData: boolean;
}
export declare const defaults: TerminalDefaults;
