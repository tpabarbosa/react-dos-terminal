import { UseCommandMachineProps } from "./useMainMachine";
declare type State = 'IDDLE' | 'STARTED';
declare type Action = 'NEW_CMD' | 'FINISH';
export declare const useDynamicMachine: ({ outputHandler, onFinishCommand, main }: UseCommandMachineProps) => {
    state: State;
    action: (action: Action, arg?: any) => void;
};
export {};
