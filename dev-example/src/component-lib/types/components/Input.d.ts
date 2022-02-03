import { FormEvent, KeyboardEvent } from "react";
declare type InputProps = {
    onClick?: () => void;
    onInput?: (e: FormEvent<HTMLDivElement>) => void;
    onKeyUp?: (e: KeyboardEvent<HTMLDivElement>) => void;
    onKeyDown?: (e: KeyboardEvent<HTMLDivElement>) => void;
    onKeyPress?: (e: KeyboardEvent<HTMLDivElement>) => void;
    id: string;
    prompt?: string;
    colors?: {
        color: string;
        background: string;
    };
    caretColors?: {
        color: string;
        background: string;
    };
};
declare const Input: import("react").ForwardRefExoticComponent<InputProps & import("react").HTMLAttributes<HTMLDivElement> & import("react").RefAttributes<HTMLDivElement>>;
export default Input;
