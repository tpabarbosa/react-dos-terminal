import { MainAction, MainState } from "./machines/useMainMachine";
import { UseOutputHandler } from "./useOutputHandler";
declare type UseCommandsHandlerProps = {
    state: MainState;
    action: (action: MainAction, arg?: any) => void;
    outputHandler: UseOutputHandler;
};
export declare const useCommandsHandler: ({ action, outputHandler }: UseCommandsHandlerProps) => {
    run: (cmd: string) => Promise<void>;
};
export {};
