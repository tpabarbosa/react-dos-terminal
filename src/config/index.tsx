import { TerminalColors } from "../components/Terminal"
import { FakeCommand, Help } from "../contexts/CommandContext";

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
    messages: TerminalMessages,
}

export interface TerminalMessages {
    toBeImplemented: string[],
    notFound: string[],
    cantBeExecuted: string[],
    initialOutput: string[];
}
export interface TerminalCommandConfig {
    commands: FakeCommand[],
    helps?: Help[],
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
        screenStripes: true,
        messages: {
            initialOutput: ['Welcome to IOS react-dos-terminal', '', ''],
            toBeImplemented: [`Error: "%n" command hasn't been implemented.`, ''],
            notFound: [`Error: "%n" is not a valid command.`, ''],
            cantBeExecuted: [`Error: "%n" can't be executed.`, '']
        }
    },
    
}

