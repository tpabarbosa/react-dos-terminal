import { useCallback, useEffect, useState } from 'react'
import { CommandToOutput } from '../contexts/CommandContext'

export interface OutputTypewriter {
    isTypewriting: boolean
    startTypewriting: () => void
    endTypewriting: () => void
    typeInterval: number
    changeTypeInterval: (value: number) => void
}

export interface UseOutputHandler {
    output: string[]
    // changeOutput: (value: string[]) => void,
    addToOutput: (value: string[] | string) => void
    removeFromOutput: (numberOfLines: number) => void
    clearOutput: () => void
    outputQueue: CommandToOutput[]
    addToQueue: (actions: CommandToOutput[]) => void

    lastOutput: string[]
    // changeLastOutput:(value: string[]) => void,
    typewriter: OutputTypewriter

    // print: () => void
}

export interface OutputHandlerProps {
    initialOutput: string[]
    shouldTypewrite?: boolean
}

export const useOutputHandler = ({
    initialOutput,
    shouldTypewrite = false,
}: OutputHandlerProps): UseOutputHandler => {
    const [outputQueue, setOutputQueue] = useState<CommandToOutput[]>([
        { action: 'add', value: initialOutput },
    ])
    const [output, setOutput] = useState<string[]>([])
    const [lastOutput, setLastOutput] = useState<string[]>([])
    const [isTypewriting, setIsTypewriting] = useState(false)
    const [typeInterval, setTypeInterval] = useState(10)

    // const changeOutput = (value: string[]) => {
    //     setOutputHistory(value)
    // }

    const addToOutput = (value: string[] | string) => {
        if (typeof value === 'string') {
            setOutput((prev) => [...prev, value])
        } else {
            setOutput((prev) => [...prev, ...value])
        }
    }

    const removeFromOutput = useCallback(
        (value: number) => {
            const newOutput = [...output]
            newOutput.splice(0 - value)
            setOutput(newOutput)
        },
        [output]
    )

    const clearOutput = () => {
        setOutput([])
    }

    const addToQueue = (actions: CommandToOutput[]) => {
        setOutputQueue((prev) => [...prev, ...actions])
    }

    const startTypewriting = () => {
        setIsTypewriting(true)
    }

    const endTypewriting = () => {
        setOutput((prev) => [...prev, ...lastOutput])
        setLastOutput([])
        setIsTypewriting(false)
    }

    const changeLastOutput = (value: string | string[]) => {
        if (typeof value === 'string') {
            setLastOutput((prev) => [...prev, value])
        } else {
            setLastOutput((prev) => [...prev, ...value])
        }
    }

    const changeTypeInterval = (value: number) => {
        setTypeInterval(value)
    }

    useEffect(() => {
        if (outputQueue.length > 0 && !isTypewriting) {
            switch (outputQueue[0].action) {
                case 'add':
                    if (shouldTypewrite) {
                        startTypewriting()
                        changeLastOutput(outputQueue[0].value)
                    } else {
                        addToOutput(outputQueue[0].value)
                    }
                    break
                case 'remove':
                    removeFromOutput(outputQueue[0].value)
                    break
                case 'clear':
                    clearOutput()
                    break
                default:
            }
            const newQueue = [...outputQueue]
            newQueue.shift()
            setOutputQueue(newQueue)
        }
    }, [outputQueue, isTypewriting, removeFromOutput, shouldTypewrite])

    return {
        output,
        // changeOutputHistory,
        addToOutput,
        removeFromOutput,
        clearOutput,
        outputQueue,
        addToQueue,
        lastOutput,
        // changeLastOutput,

        typewriter: {
            isTypewriting,
            startTypewriting,
            endTypewriting,
            typeInterval,
            changeTypeInterval,
        },
    }
}
