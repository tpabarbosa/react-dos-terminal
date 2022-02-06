import { UseCommandMachineProps } from "./useMainMachine";
declare type State = 'IDDLE' | 'STARTED' | 'WAITING' | 'TYPING_RESULT';
declare type Action = 'NEW_CMD' | 'FINISH_TYPING_WAIT_MSG' | 'PRINT_RESULT_MSG' | 'FINISH_TYPING_RESULT';
export declare const useAsyncMachine: ({ outputHandler, onFinishCommand }: UseCommandMachineProps) => {
    state: State;
    action: (action: Action, arg?: any) => void;
};
export {};
