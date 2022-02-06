import { TerminalColors } from "../components/Terminal";
import { TerminalConfig } from "../config";
export declare const useInitializer: (shouldPersisteData: boolean | undefined, config: TerminalConfig | undefined) => {
    terminal: {
        colors: TerminalColors;
        screenStripes: boolean;
        autoFocus: boolean;
        messages: {
            toBeImplemented: string[];
            notFound: string[];
            cantBeExecuted: string[];
            initialOutput: string[];
        };
    };
    isInitialized: boolean;
};
