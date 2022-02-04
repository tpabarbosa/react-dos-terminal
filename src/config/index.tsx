import { TerminalColors } from "../components/Terminal"

export type TerminalLoadingScreenOptions = 'always' | 'never' | 'first-time';

export interface TerminalLoadingScreen {
    shouldShow: TerminalLoadingScreenOptions;
    messageOrElement: string | string[] | JSX.Element;
    loadingTime: number;
}

export interface TerminalConfig {
    colors: TerminalColors;
    screenStripes: boolean;
    autoFocus: boolean;
    initialMessage: string | string[];
}

export interface TerminalDefaults {
    shouldPersisteData: boolean;
    loadingScreen: TerminalLoadingScreen;
    terminal: TerminalConfig;
}

export const defaults:TerminalDefaults = {
    shouldPersisteData: true,
    loadingScreen: {
        shouldShow: 'first-time',
        messageOrElement: ['Installing IOS react-dos-terminal','', 'Please wait...', '',],
        loadingTime: 5000,
    },
    terminal: {
        colors:  {
            background: '#000000',
            color: '#aaaaaa',
        },
        autoFocus: true,
        initialMessage: ['Welcome to IOS react-dos-terminal', '', ''],
        screenStripes: true,
    },
    
}

