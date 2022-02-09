/// <reference types="react" />
import * as React from 'react';
import React__default, { MouseEvent, FormEvent, KeyboardEvent } from 'react';

declare type FakeAttributes = 'r' | 'rh' | 'w' | 'wh' | 's' | 'sh';
declare type FakeFileTypes = 'file' | 'directory' | 'exec-file' | 'system-file';
declare type FakeFileTypesAbr = 'f' | 'd' | 'e' | 's';
interface FakeFile {
    name: string;
    type: FakeFileTypes;
    content: string | string[] | FakeFile[] | FakeCommand;
    attributes: FakeAttributes;
    fakeFileSize?: number;
}
declare type FakeFileSystem = {
    files: {
        [name: string]: {
            c: string | string[] | FakeFileSystem | FakeCommand;
            a: FakeAttributes;
            t: FakeFileTypesAbr;
            s: number;
        };
    };
    totalSize: number;
};

interface FakeCommand {
    name: string;
    alias?: string[];
    action?: (props: CommandProps) => Command | Promise<Command>;
    async?: {
        waitingMessage?: string[];
    };
    help?: (() => string | string[]) | string | string[];
}
interface CommandProps {
    name: string;
    args: string;
    actualDir: string;
    files: FakeFileSystem;
    allCommands: FakeCommand[];
    messages: CommandsMessages;
}
declare type CommandToOutput = {
    action: 'clear';
} | {
    action: 'add';
    value: string | string[];
} | {
    action: 'remove';
    value: number;
};
declare type CommandToConfigTerminal = {
    config: 'setColors';
    value: TerminalColors;
} | {
    config: 'setActualDir';
    value: string;
};
interface Command {
    dynamic?: {
        element: JSX.Element;
        options?: {
            shouldHideTerminalOutput?: boolean;
        };
    };
    output?: CommandToOutput[];
    configTerminal?: CommandToConfigTerminal;
}
interface TerminalCommand extends Command {
    name: string;
    args: string;
    waitingMessage?: string[];
}
interface CommandContextAPI extends CommandState {
    startRunningCommand: () => void;
    endRunningCommand: () => void;
    setActualCmd: (cmd: TerminalCommand | null) => void;
}
interface CommandState {
    allCommands: FakeCommand[];
    shouldAllowHelp: boolean;
    actualCmd?: TerminalCommand | null;
    isRunningCommand: boolean;
    messages: CommandsMessages;
}
declare const useCommand: () => CommandContextAPI;

interface TerminalLoadingScreen {
    shouldShow: string;
    messageOrElement: string | string[] | JSX.Element;
    loadingTime: number;
}
interface TerminalConfig {
    colors: TerminalColors;
    screenStripes: boolean;
    autoFocus: boolean;
}
interface CommandsMessages {
    toBeImplemented: string;
    notFound: string;
    cantBeExecuted: string;
    helpNotAvailable: string;
}
interface CommandsConfig {
    commands: FakeCommand[];
    excludeCommands: string[] | 'all';
    shouldAllowHelp: boolean;
    messages: Partial<CommandsMessages>;
}
interface TerminalFileSystemConfig {
    files: FakeFile[];
    actualDir: string;
    useFakeFileSystem: boolean;
    useInternalFiles: boolean;
}
interface TerminalDefaults {
    shouldPersisteData: boolean;
    loadingScreen: Partial<TerminalLoadingScreen>;
    terminal: Partial<TerminalConfig>;
    commands: Partial<CommandsConfig>;
    initialOutput: string[];
    fileSystem: Partial<TerminalFileSystemConfig>;
}

declare const allowedColors: readonly ["#000000", "#0000aa", "#00aa00", "#00aaaa", "#aa0000", "#aa00aa", "#aa5500", "#aaaaaa", "#555555", "#5555ff", "#55ff55", "#55ffff", "#ff5555", "#ff55ff", "#ffff55", "#ffffff"];
declare const namesMap: readonly ["black", "blue", "green", "aqua", "red", "purple", "yellow", "white", "gray", "lightblue", "lightgreen", "lightaqua", "lightred", "lightpurple", "lightyellow", "brightwhite"];
declare type ColorsName = typeof namesMap[number];
declare type AllowedColors = typeof allowedColors[number];
declare const colorsHelper: {
    getHexByColor: (color: AllowedColors) => string;
    getColorByName: (color: ColorsName) => AllowedColors;
    getColorByHex: (color: string) => AllowedColors;
    allowedColors: readonly ["#000000", "#0000aa", "#00aa00", "#00aaaa", "#aa0000", "#aa00aa", "#aa5500", "#aaaaaa", "#555555", "#5555ff", "#55ff55", "#55ffff", "#ff5555", "#ff55ff", "#ffff55", "#ffffff"];
};

declare type Colors<T extends string> = {
    [field in T]: AllowedColors;
};
declare type TerminalColors = Colors<'background' | 'color'>;
interface TerminalProps {
    config: Partial<TerminalDefaults>;
}
declare const Terminal: ({ config }: TerminalProps) => JSX.Element;

declare const fileSystemHelper: {
    getFakeFileSize: (func: ((...args: never) => unknown)[] | ((...args: never) => unknown)) => number;
    getDir: (files: FakeFileSystem, dirPath: string) => FakeFileSystem | null;
    getCommandsSize: (commands: FakeCommand[]) => number;
    fullDirPath: (dir: string) => string;
    formatPrompt: (dir: string) => string;
};

interface ScreenProps {
    children: React__default.ReactNode;
    colors?: TerminalColors;
    stripes?: boolean;
    fullscreen?: boolean;
}
declare const CommandScreen: ({ children, colors, stripes, fullscreen, ...rest }: ScreenProps & React__default.HTMLAttributes<HTMLDivElement>) => JSX.Element;

declare type InputProps = {
    onClick?: (e: MouseEvent<HTMLDivElement>) => void;
    onInput?: (e: FormEvent<HTMLDivElement>) => void;
    onKeyUp?: (e: KeyboardEvent<HTMLDivElement>) => void;
    onKeyDown?: (e: KeyboardEvent<HTMLDivElement>) => void;
    onKeyPress?: (e: KeyboardEvent<HTMLDivElement>) => void;
    id: string;
    prompt?: string;
    colors?: Partial<TerminalColors>;
    caretColors?: Partial<TerminalColors>;
};
declare const Input: React__default.ForwardRefExoticComponent<InputProps & React__default.HTMLAttributes<HTMLDivElement> & React__default.RefAttributes<HTMLDivElement>>;

interface OutputTypewriter {
    isTypewriting: boolean;
    startTypewriting: () => void;
    endTypewriting: () => void;
    typeInterval: number;
    changeTypeInterval: (value: number) => void;
}
interface UseOutputHandler {
    outputHistory: string[];
    addToHistory: (value: string[] | string) => void;
    removeFromHistory: (numberOfLines: number) => void;
    outputQueue: CommandToOutput[];
    addToQueue: (actions: CommandToOutput[]) => void;
    lastOutput: string[];
    typewriter: OutputTypewriter;
}

interface OutputProps {
    children: React__default.ReactNode;
    colors?: Partial<TerminalColors>;
}
declare const Output: {
    ({ children, colors, ...rest }: OutputProps & React__default.HTMLAttributes<HTMLDivElement>): JSX.Element;
    Typewriter: ({ output, flashing, colors, ...rest }: TypewriterProps) => JSX.Element;
    Print: ({ output, flashing, colors, ...rest }: PrintProps & React__default.HTMLAttributes<HTMLDivElement>) => JSX.Element;
};
interface PrintProps {
    output: string | string[];
    flashing?: boolean;
    colors?: Partial<TerminalColors>;
}
interface TypewriterProps {
    output: UseOutputHandler;
    flashing?: boolean;
    colors?: Partial<TerminalColors>;
}

declare const useInput: () => {
    ref: React.RefObject<HTMLDivElement>;
    getText: () => string;
    setText: (text: string) => void;
    setFocus: () => void;
};

declare type Machine<State extends string, Action extends string> = {
    initialState: State;
    initialEffect?: () => void;
    machineEffect?: () => void;
    machineEffectDependencies?: any[];
    statesEffectDependencies?: any[];
    states: {
        [state in State]: {
            effect?: () => void;
            actions: {
                [action in Action]?: {
                    newState?: State;
                    onTransition?: (arg?: any) => void;
                };
            };
        };
    };
};
declare const useStateMachine: <State extends string, Action extends string>(machine: Machine<State, Action>) => [State, (action: Action, arg?: any) => void];

export { Command, CommandScreen, FakeCommand, FakeFile, Input, Machine, Output, Terminal, TerminalColors, colorsHelper, fileSystemHelper, useCommand, useInput, useStateMachine };
