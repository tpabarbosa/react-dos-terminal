import { UseCommandMachineProps } from "./useMainMachine";
declare type State = 'IDDLE' | 'STARTED';
declare type Action = 'NEW_CMD' | 'FINISH_TYPING';
export declare const useStaticMachine: ({ outputHandler, onFinishCommand }: UseCommandMachineProps) => {
    state: State;
    action: (action: Action, arg?: any) => void;
};
export {};
