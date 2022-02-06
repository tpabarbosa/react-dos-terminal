import { CommandToOutput } from "../contexts/CommandContext";
export interface OutputTypewriter {
    isTypewriting: boolean;
    startTypewriting: () => void;
    endTypewriting: () => void;
    typeInterval: number;
    changeTypeInterval: (value: number) => void;
}
export interface UseOutputHandler {
    outputHistory: string[];
    addToHistory: (value: string[] | string) => void;
    outputQueue: CommandToOutput[];
    addToQueue: (actions: CommandToOutput[]) => void;
    lastOutput: string[];
    typewriter: OutputTypewriter;
}
export declare const useOutputHandler: (initial: string[]) => UseOutputHandler;
