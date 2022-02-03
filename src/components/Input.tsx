import { FormEvent, ForwardedRef, forwardRef, KeyboardEvent, MouseEvent, useEffect, useState } from "react";
import { useCaretHandler } from "../hooks/useCaretHandler";
import { InputCaret, InputContainer, InputContent } from "../styles/styles";

type InputProps = {
    onClick?: (e: MouseEvent<HTMLDivElement>) => void,
    onInput?: (e: FormEvent<HTMLDivElement>) => void,
    onKeyUp?: (e: KeyboardEvent<HTMLDivElement>) => void,
    onKeyDown?: (e: KeyboardEvent<HTMLDivElement>) => void,
    onKeyPress?: (e: KeyboardEvent<HTMLDivElement>) => void,
    id: string, 
    prompt?: string,
    colors?: {
        color: string;
        background: string;
    };
    caretColors?: {
        color: string;
        background: string;
    };
}

const Input = forwardRef(({onClick, onInput, onKeyDown, onKeyPress, onKeyUp, id, prompt='', colors, caretColors,...rest}: InputProps & React.HTMLAttributes<HTMLDivElement>, ref: ForwardedRef<HTMLDivElement>) => {
    
    const [isCaretLoaded, setIsCaretLoaded] = useState(false);
    const caretHandler = useCaretHandler();

    useEffect(() => {
        if (!isCaretLoaded) {
            const el = document.getElementById(id) as HTMLDivElement;
            el && caretHandler.setInputRef(el);
            setIsCaretLoaded(prev => !prev);
        }
    }, [isCaretLoaded, id, caretHandler])

    const handleKeyUp = (e: KeyboardEvent<HTMLDivElement>) => {
        onKeyUp && onKeyUp(e);
        caretHandler.updateCaretPosition();
    }

    const handleInput = (e: FormEvent<HTMLDivElement>) => {
        onInput && onInput(e);
        caretHandler.updateCaretPosition();
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
        onKeyDown && onKeyDown(e);
        caretHandler.updateCaretPosition();
    }

    const handleKeyPress = (e: KeyboardEvent<HTMLDivElement>) => {
        onKeyPress && onKeyPress(e);
        caretHandler.updateCaretPosition();
    }

    const handleClick = (e: MouseEvent<HTMLDivElement>) => {
        onClick && onClick(e);
        caretHandler.updateCaretPosition();
    }

    return (
        <InputContainer {...rest} colors={colors} >
            <pre>{prompt}</pre>
            <InputContent 
                ref={ref}
                id={id}
                contentEditable="true" 
                onClick={handleClick}
                onInput={handleInput}
                onKeyUp={handleKeyUp}
                onKeyDown={handleKeyDown}
                onKeyPress={handleKeyPress}
                autoCorrect="off" 
                autoCapitalize="none" 
                spellCheck={false}
                inputMode='text'
                
            /> 
            <Caret correction={caretHandler.caretCorrection} colors={caretColors}/>
        </InputContainer>
    );
})

interface CaretProps {
    correction: number;
    colors?: {
        color: string;
        background: string;
    };
}

const Caret = ({correction, colors}: CaretProps) => {

    return (
        <InputCaret positionCorrection={correction} colors={colors}>
            &nbsp;
        </InputCaret>
    )
}

export default Input