export declare type UseCaretHandler = {
    caretCorrection: number;
    updateCaretPosition: () => void;
    setPosition: (value: number) => void;
    input: HTMLDivElement;
    setInputRef: (input: any) => void;
};
export declare const useCaretHandler: () => UseCaretHandler;
