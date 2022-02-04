import { useState } from "react";

export interface OutputTypewriter {
    isTypewriting: boolean,
    startTypewriting: (value: string[]) => void,
    endTypewriting: () => void,
    typeInterval: number,
    changeTypeInterval: (value:number) => void,
}

export interface UseOutput {
    outputHistory: string[],
    changeOutputHistory: (value: string[]) => void,
    lastOutput: string[],
    changeLastOutput:(value: string[]) => void,
    typewriter: OutputTypewriter
}

export const useOutput = (): UseOutput => {
    const [outputHistory, setOutputHistory] = useState<string[]>([]);
    const [lastOutput, setLastOutput] = useState<string[]>([]);
    const [isTypewriting, setIsTypewriting] = useState(false);
    const [typeInterval, setTypeInterval] = useState(40)

    const startTypewriting = (value: string[]) => {
        setLastOutput(value);
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

    const changeOutputHistory = (value: string[]) => {
        setOutputHistory(value)
    }

    const changeTypeInterval = (value: number) => {
        setTypeInterval(value);
    }

    return {
        outputHistory,
        changeOutputHistory,
        lastOutput,
        changeLastOutput,
        typewriter: {
            isTypewriting,
            startTypewriting,
            endTypewriting,
            typeInterval,
            changeTypeInterval
        }
    }
}