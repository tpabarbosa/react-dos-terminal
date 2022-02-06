import { UseOutputHandler } from "../useOutputHandler";
export declare type MainState = 'IDDLE' | 'RUNNING_COMMAND';
export declare type MainAction = 'NEW_CMD' | 'FINISH_CMD';
interface UseMachineProps {
    outputHandler: UseOutputHandler;
}
export declare const useMainMachine: ({ outputHandler }: UseMachineProps) => {
    state: MainState;
    action: (action: MainAction, arg?: any) => void;
};
export {};
