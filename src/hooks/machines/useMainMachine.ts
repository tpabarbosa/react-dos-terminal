import _ from "lodash";
import { useState } from "react";
import { useTerminalCommand } from "../../contexts/CommandContext";
import { UseOutputHandler } from "../useOutputHandler";
import { Machine, useStateMachine } from "./useStateMachine";

export type MainState = 'IDDLE' | 'RUNNING_COMMAND';
export type MainAction = 'NEW_CMD' | 'FINISH_CMD' ;

interface UseMachineProps {
    outputHandler: UseOutputHandler
}

export const useMainMachine = ({outputHandler}: UseMachineProps) => {

    const command = useTerminalCommand();
    const { isRunningCommand } = command.state;
    const { outputQueue } = outputHandler;
    const { isTypewriting } = outputHandler.typewriter;
    const { endRunningCommand, setActualCmd } = command.action;

    const [type, setType] = useState('');

    const onFinishCommand = () => {
        endRunningCommand();
        setActualCmd(null);
        setType('')
        action('FINISH_CMD');
    }

    const mainMachine: Machine<MainState, MainAction> = {
        initialState: 'IDDLE',
        statesEffectDependencies: [isRunningCommand, isTypewriting, outputQueue, type],
        states: {
            IDDLE: {
                actions: {
                    NEW_CMD: {
                        newState: 'RUNNING_COMMAND',
                        onTransition: (type: 'async'|'static'|'dynamic') => {
                            setType(type)
                        },
                    },
                },
            },
            RUNNING_COMMAND: { 
                effect: () => {
                    if (!isRunningCommand && type==='dynamic') {
                        onFinishCommand();
                        return
                    }
                    if (isRunningCommand && outputQueue.length === 0 && !isTypewriting && type!=='dynamic' && type !== '') {
                        onFinishCommand();
                    }
                },
                actions: { FINISH_CMD: {newState: 'IDDLE'} } 
            },
        }
    }

    const [state, action] = useStateMachine(mainMachine);

    return {state, action}
}
