export declare type Machine<State extends string, Action extends string> = {
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
                    onTransition?: ((arg?: any) => void);
                };
            };
        };
    };
};
export declare const useStateMachine: <State extends string, Action extends string>(machine: Machine<State, Action>) => [State, (action: Action, arg?: any) => void];
