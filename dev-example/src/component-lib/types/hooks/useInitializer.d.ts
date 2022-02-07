import { TerminalColors } from "../components/Terminal";
import { TerminalCommandsConfig, TerminalConfig } from "../config";
import { FakeCommand } from "../contexts/CommandContext";
export declare const useInitializer: (shouldPersisteData: boolean | undefined, terminal: TerminalConfig | undefined, commands: TerminalCommandsConfig | undefined) => {
    terminal: {
        colors: TerminalColors;
        screenStripes: boolean;
        autoFocus: boolean;
    };
    commands: {
        commands: FakeCommand[];
        shouldAllowHelp: boolean;
        excludeCommands: string[] | "all";
        messages: {
            toBeImplemented: string;
            notFound: string;
            cantBeExecuted: string;
            helpNotAvailable: string;
        };
    };
    isInitialized: boolean;
};
