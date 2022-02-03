import { TerminalColors } from "../components/Terminal"

export type TerminalLoadingScreenOptions = 'always' | 'never' | 'first-time';

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

export const defaults:TerminalDefaults = {
    colors:  {
        background: '#000000',
        color: '#aaaaaa',
    },
    screenStripes: true,
    loadingScreen: {
        shouldShow: 'first-time',
        messageOrElement: ['Installing IOS react-dos-terminal','', 'Please wait...', '',],
        loadingTime: 10000,
    },
    shouldPersisteData: true,
}

