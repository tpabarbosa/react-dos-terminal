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
}

export interface TerminalCommandsMessages {
    toBeImplemented: string,
    notFound: string,
    cantBeExecuted: string,
    helpNotAvailable: string,
}
export interface TerminalCommandsConfig {
    commands: FakeCommand[],
    excludeCommands: string[] | 'all',
    shouldAllowHelp: boolean,
    messages: TerminalCommandsMessages,
}

export interface TerminalDefaults {
    shouldPersisteData: boolean;
    loadingScreen: TerminalLoadingScreen;
    terminal: TerminalConfig;
    commands: TerminalCommandsConfig;
    initialOutput: string[];
}

export const defaults:TerminalDefaults = {
    shouldPersisteData: true,
    initialOutput: ['Welcome to IOS react-dos-terminal', '', ''],
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
    },
    commands: {
        commands: [],
        excludeCommands: [],
        shouldAllowHelp: true,
        messages: {
            toBeImplemented: `Error: "%n" command hasn't been implemented.`,
            notFound: `Error: "%n" is not a valid command.`,
            cantBeExecuted: `Error: "%n" can't be executed.`,
            helpNotAvailable: `Error: "%n" doesn't have any help available.`
        }
    }
}

