export interface UseOutputTypewriter {
    outputHistory: string[];
    updateOutputHistory: (value: string[]) => void;
    isTypewriting: boolean;
    toggleIsTypewriting: (value: boolean) => void;
    onFinishTypewriting: () => void;
    lastOutput: string[];
    updateLastOutput: (value: string) => void;
    typeInterval: number;
    setTypeInterval: (value: number) => void;
}
export declare const useOutputTypewriter: () => {
    outputHistory: string[];
    updateOutputHistory: (value: string[]) => void;
    isTypewriting: boolean;
    toggleIsTypewriting: (value: boolean) => void;
    onFinishTypewriting: () => void;
    lastOutput: string[];
    updateLastOutput: (value: string[]) => void;
    typeInterval: number;
    changeTypeInterval: (value: number) => void;
};
