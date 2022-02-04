import { useState } from "react";


export type UseCaretHandler = {
    caretCorrection: number,
    updateCaretPosition: () => void,
    setPosition: (value: number) => void,
    input: HTMLDivElement
    setInputRef: (input: any) => void,
}

export const useCaretHandler = (): UseCaretHandler => {

    const [caretCorrection, setCaretCorrection] = useState(0);
    const [actualInput, setActualInput] = useState<HTMLDivElement | null>(null)

    // const terminal = useTerminal();
    // const { isInitialized, config } = terminal.state;

    const setInputRef = (input: HTMLDivElement | null) => {
        setActualInput(input);
    }

    const updateCaretPosition = () => {
        const tex = actualInput?.textContent as string;
        const pos = actualInput ? getCaretPosition(actualInput) : 0;
        setCaretCorrection(pos-tex.length);
        actualInput && actualInput.focus();
    }

    const setPosition = (pos: number) => {
        const tex = actualInput?.textContent as string;
        actualInput && setCaret(actualInput, pos);
        setCaretCorrection(pos-tex.length);
    }

    // useEffect( () => {
    //     isInitialized && actualInput && actualInput.focus();
    //     !isInitialized && config.autoFocus && actualInput && actualInput.focus()

    // }, [actualInput, isInitialized, config.autoFocus])

    const getCaretPosition = (editableDiv: HTMLDivElement) => {
        let caretPos = 0;
        let sel: Selection | null;
        let range;
        
        if (window.getSelection) {
            sel = window.getSelection();
            if (sel && sel.rangeCount) {
                range = sel.getRangeAt(0);
                if (range.commonAncestorContainer.parentNode === editableDiv) {
                caretPos = range.endOffset;
                }
            }
        }
        return caretPos;
    }
    
    const setCaret = (editableDiv: HTMLDivElement, charPos: number) => {
    
        let range = document.createRange()
        let sel: Selection | null = window.getSelection();
    
        if (editableDiv.firstChild !== null) {
            range.setStart(editableDiv.firstChild, charPos)
        }
        else { 
            range.setStart(editableDiv, charPos)
        }
        range.collapse(true)
    
        if (sel) {
            sel.removeAllRanges()
            sel.addRange(range)
        }
    }

    return {
        caretCorrection,
        updateCaretPosition,
        input: actualInput as HTMLDivElement,
        setPosition,
        setInputRef,
    }
}