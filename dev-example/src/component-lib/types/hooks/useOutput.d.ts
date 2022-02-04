export interface OutputTypewriter {
    isTypewriting: boolean;
    startTypewriting: (value: string[]) => void;
    endTypewriting: () => void;
    typeInterval: number;
    changeTypeInterval: (value: number) => void;
}
export interface UseOutput {
    outputHistory: string[];
    changeOutputHistory: (value: string[]) => void;
    lastOutput: string[];
    changeLastOutput: (value: string[]) => void;
    typewriter: OutputTypewriter;
}
export declare const useOutput: () => UseOutput;
