import DOMPurify from 'dompurify'
import React, {
    FormEvent,
    ForwardedRef,
    forwardRef,
    KeyboardEvent,
    MouseEvent,
    useEffect,
    useState,
} from 'react'
import { useCaretHandler } from '../hooks/useCaretHandler'
import {
    InputCaret,
    InputContainer,
    InputContent,
    PrintLine,
} from '../styles/styles'
import { TerminalColors } from './Terminal'

type InputProps = {
    onClick?: (e: MouseEvent<HTMLDivElement>) => void
    onInput?: (e: FormEvent<HTMLDivElement>) => void
    onKeyUp?: (e: KeyboardEvent<HTMLDivElement>) => void
    onKeyDown?: (e: KeyboardEvent<HTMLDivElement>) => void
    onKeyPress?: (e: KeyboardEvent<HTMLDivElement>) => void
    id: string
    prompt?: string
    colors?: Partial<TerminalColors>
    caretColors?: Partial<TerminalColors>
}

interface CaretProps {
    correction: number
    colors?: Partial<TerminalColors>
}

const Caret = ({ correction, colors }: CaretProps) => {
    return (
        <InputCaret positionCorrection={correction} colors={colors}>
            &nbsp;
        </InputCaret>
    )
}

const Input = forwardRef(
    (
        {
            onClick,
            onInput,
            onKeyDown,
            onKeyPress,
            onKeyUp,
            id,
            prompt = '',
            colors,
            caretColors,
            ...rest
        }: InputProps & React.HTMLAttributes<HTMLDivElement>,
        ref: ForwardedRef<HTMLDivElement>
    ) => {
        const [isCaretLoaded, setIsCaretLoaded] = useState(false)
        const caretHandler = useCaretHandler()

        useEffect(() => {
            if (!isCaretLoaded) {
                const el = document.getElementById(id) as HTMLDivElement
                if (el) caretHandler.setInputRef(el)
                setIsCaretLoaded((prev) => !prev)
            }
        }, [isCaretLoaded, id, caretHandler])

        const handleKeyUp = (e: KeyboardEvent<HTMLDivElement>) => {
            if (onKeyUp) onKeyUp(e)
            caretHandler.updateCaretPosition()
        }

        const handleInput = (e: FormEvent<HTMLDivElement>) => {
            if (onInput) onInput(e)
            caretHandler.updateCaretPosition()
        }

        const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
            if (onKeyDown) onKeyDown(e)
            caretHandler.updateCaretPosition()
        }

        const handleKeyPress = (e: KeyboardEvent<HTMLDivElement>) => {
            if (onKeyPress) onKeyPress(e)
            caretHandler.updateCaretPosition()
        }

        const handleClick = (e: MouseEvent<HTMLDivElement>) => {
            if (onClick) onClick(e)
            caretHandler.updateCaretPosition()
        }

        return (
            <InputContainer {...rest} colors={colors}>
                <PrintLine
                    dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(prompt),
                    }}
                />
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
                    inputMode="text"
                />
                <Caret
                    correction={caretHandler.caretCorrection}
                    colors={caretColors}
                />
            </InputContainer>
        )
    }
)

export default Input
