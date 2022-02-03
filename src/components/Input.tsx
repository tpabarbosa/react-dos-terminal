import { FormEvent, ForwardedRef, forwardRef, KeyboardEvent } from "react";
import { InputCaret, InputContainer, InputContent } from "../styles/styles";

type InputProps = {
    onClick?: () => void,
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

const Input = forwardRef(({id, prompt='', colors, caretColors,...rest}: InputProps & React.HTMLAttributes<HTMLDivElement>, ref: ForwardedRef<HTMLDivElement>) => {
    
    return (
        <InputContainer {...rest} colors={colors} >
            <pre>{prompt}</pre>
            <InputContent 
                ref={ref}
                id={id}
                contentEditable="true" 
                // onClick={handleClick}
                // onInput={handleInput}
                // onKeyUp={handleKeyUp}
                // onKeyDown={handleKeyDown}
                // onKeyPress={handleKeyPress}
                autoCorrect="off" 
                autoCapitalize="none" 
                spellCheck={false}
                inputMode='text'
                
            /> 
            <Caret correction={0} colors={caretColors}/>
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