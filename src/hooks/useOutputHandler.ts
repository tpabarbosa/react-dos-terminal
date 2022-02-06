import _ from "lodash";
import { useEffect, useState } from "react";
import { CommandToOutput } from "../contexts/CommandContext";

export interface OutputTypewriter {
    isTypewriting: boolean,
    startTypewriting: () => void,
    endTypewriting: () => void,
    typeInterval: number,
    changeTypeInterval: (value:number) => void,
}

export interface UseOutputHandler {
    outputHistory: string[],
    //changeOutputHistory: (value: string[]) => void,
    addToHistory: (value: string[] | string) => void,
    //removeFromHistory: (numberOfLines: number) => void,
    //clearHistory: () => void,
    outputQueue: CommandToOutput[],
    addToQueue: (actions: CommandToOutput[]) => void,

    lastOutput: string[],
    //changeLastOutput:(value: string[]) => void,
    typewriter: OutputTypewriter,
    
    //print: () => void
}

export const useOutputHandler = (initial: string[]): UseOutputHandler => {
    const [outputQueue, setOutputQueue] = useState<CommandToOutput[]>([{action: 'add', value: initial}]);
    const [outputHistory, setOutputHistory] = useState<string[]>([]);
    const [lastOutput, setLastOutput] = useState<string[]>([]);
    const [isTypewriting, setIsTypewriting] = useState(false);
    const [typeInterval, setTypeInterval] = useState(40)

    // const changeOutputHistory = (value: string[]) => {
    //     setOutputHistory(value)
    // }

    const addToHistory = (value: string[] | string) => {
        if (typeof value === 'string') {
            setOutputHistory(prev=> [...prev, value])
        } else {
            setOutputHistory(prev=> [...prev, ...value])
        }
    }

    const removeFromHistory = (value: number) => {
        const newHistory = [...outputHistory];
        newHistory.splice(0 - value);
        setOutputHistory(newHistory)
    }

    const clearHistory = () => {
        setOutputHistory([])
    }

    const addToQueue = (actions: CommandToOutput[]) => {
        setOutputQueue(prev => [...prev, ...actions])
    }

    const startTypewriting = () => {
        setIsTypewriting(true);
    }

    const endTypewriting = () => {
        setOutputHistory(prev => [...prev, ...lastOutput]);
        setLastOutput([]);
        setIsTypewriting(false);
    }
    
    const changeLastOutput = (value: string[]) => {
        setLastOutput(value)
    }

    const changeTypeInterval = (value: number) => {
        setTypeInterval(value);
    }

    useEffect(() => {
        if (outputQueue.length > 0 && !isTypewriting) {
            switch (outputQueue[0].action) {
                case 'add': 
                    startTypewriting();
                    if (typeof outputQueue[0].value === 'string'){
                        changeLastOutput([outputQueue[0].value]);
                    } else {
                        changeLastOutput(outputQueue[0].value);
                    }
                    break;
                case 'remove': 
                    removeFromHistory(outputQueue[0].value);
                    break;
                case 'clear': 
                    clearHistory();
                    break;
            }
            const newQueue = [...outputQueue];
            newQueue.shift();
            setOutputQueue(newQueue);
        }
    },[outputQueue, isTypewriting])

    return {
        outputHistory,
        //changeOutputHistory,
        addToHistory,
        //removeFromHistory,
        //clearHistory,
        outputQueue,
        addToQueue,
        lastOutput,
        //changeLastOutput,

        typewriter: {
            isTypewriting,
            startTypewriting,
            endTypewriting,
            typeInterval,
            changeTypeInterval
        },
    }
}