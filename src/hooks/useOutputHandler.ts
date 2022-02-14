import { useEffect, useState } from 'react'
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
    outputQueue: CommandToOutput[]
    addToQueue: (actions: CommandToOutput[]) => void
    addLines: (value: string[] | string, skipTypewriting?: boolean) => void
    removeLines: (numberOfLines: number) => void
    clear: () => void
    currentOutputting: string[]
    typewriter: OutputTypewriter
}

export interface OutputHandlerProps {
    initialOutput: string | string[]
    shouldTypewrite?: boolean
}

export const useOutputHandler = ({
    initialOutput,
    shouldTypewrite = false,
}: OutputHandlerProps): UseOutputHandler => {
    const [outputQueue, setOutputQueue] = useState<CommandToOutput[]>([])
    const [output, setOutput] = useState<string[]>([])
    const [currentOutputting, setCurrentOutputting] = useState<string[]>([])
    const [isTypewriting, setIsTypewriting] = useState(false)
    const [typeInterval, setTypeInterval] = useState(10)

    const addToOutput = (value: string[] | string) => {
        if (typeof value === 'string') {
            setOutput((prev) => [...prev, value])
        } else {
            setOutput((prev) => [...prev, ...value])
        }
    }

    const startTypewriting = () => {
        setIsTypewriting(true)
    }

    const endTypewriting = () => {
        setOutput((prev) => [...prev, ...currentOutputting])
        setCurrentOutputting([])
        setIsTypewriting(false)
    }

    const changeCurrentOutput = (value: string | string[]) => {
        if (typeof value === 'string') {
            setCurrentOutputting((prev) => [...prev, value])
        } else {
            setCurrentOutputting((prev) => [...prev, ...value])
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
                        if (outputQueue[0].value.length !== 0) {
                            startTypewriting()
                        }
                        changeCurrentOutput(outputQueue[0].value)
                    } else {
                        addToOutput(outputQueue[0].value)
                    }
                    break
                case 'remove': {
                    const newOutput = [...output]
                    newOutput.splice(0 - outputQueue[0].value)
                    setOutput(newOutput)
                    break
                }
                case 'clear':
                    setOutput([])
                    break
                default:
            }
            const newQueue = [...outputQueue]
            newQueue.shift()
            setOutputQueue(newQueue)
        }
    }, [outputQueue, isTypewriting, shouldTypewrite, output])

    const addToQueue = (actions: CommandToOutput[]) => {
        setOutputQueue((prev) => [...prev, ...actions])
    }

    const addLines = (value: string | string[], skipTypewriting = false) => {
        if (skipTypewriting) {
            addToOutput(value)
            return
        }
        setOutputQueue((prev) => [...prev, { action: 'add', value }])
    }

    const removeLines = (numberOfLines: number) => {
        const newOutput = [...output]
        newOutput.splice(0 - numberOfLines)
        setOutput(newOutput)
    }

    const clear = () => {
        setOutput([])
    }

    useEffect(() => {
        addLines(initialOutput)
    }, [])

    return {
        output,
        outputQueue,
        addToQueue,
        addLines,
        removeLines,
        clear,
        currentOutputting,
        typewriter: {
            isTypewriting,
            startTypewriting,
            endTypewriting,
            typeInterval,
            changeTypeInterval,
        },
    }
}
