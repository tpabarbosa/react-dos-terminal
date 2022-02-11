import { useState } from 'react'
import { useCommand } from '../../contexts/CommandContext'
import { useTerminal } from '../../contexts/TerminalContext'
import { Machine, useStateMachine } from './useStateMachine'

export type MainState = 'IDDLE' | 'RUNNING_COMMAND'
export type MainAction = 'NEW_CMD' | 'FINISH_CMD'

export const useMainMachine = () => {
    const terminal = useTerminal()
    const command = useCommand()
    const { isRunningCommand, endRunningCommand, setActualCmd } = command
    const { outputQueue } = terminal.output
    const { isTypewriting } = terminal.output.typewriter

    const [type, setType] = useState('')

    const onFinishCommand = () => {
        endRunningCommand()
        setActualCmd(null)
        setType('')
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        action('FINISH_CMD')
    }

    const mainMachine: Machine<MainState, MainAction> = {
        initialState: 'IDDLE',
        statesEffectDependencies: [
            isRunningCommand,
            isTypewriting,
            outputQueue,
            type,
        ],
        states: {
            IDDLE: {
                actions: {
                    NEW_CMD: {
                        newState: 'RUNNING_COMMAND',
                        onTransition: (
                            cmdType: 'async' | 'static' | 'dynamic'
                        ) => {
                            setType(cmdType)
                        },
                    },
                },
            },
            RUNNING_COMMAND: {
                effect: () => {
                    if (!isRunningCommand && type === 'dynamic') {
                        onFinishCommand()
                        return
                    }
                    if (
                        isRunningCommand &&
                        outputQueue.length === 0 &&
                        !isTypewriting &&
                        type !== 'dynamic' &&
                        type !== ''
                    ) {
                        onFinishCommand()
                    }
                },
                actions: { FINISH_CMD: { newState: 'IDDLE' } },
            },
        },
    }

    const [state, action] = useStateMachine(mainMachine)

    return { state, action }
}
