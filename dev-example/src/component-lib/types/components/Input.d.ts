import { FormEvent, KeyboardEvent, MouseEvent } from "react";
import { TerminalColors } from "./Terminal";
declare type InputProps = {
    onClick?: (e: MouseEvent<HTMLDivElement>) => void;
    onInput?: (e: FormEvent<HTMLDivElement>) => void;
    onKeyUp?: (e: KeyboardEvent<HTMLDivElement>) => void;
    onKeyDown?: (e: KeyboardEvent<HTMLDivElement>) => void;
    onKeyPress?: (e: KeyboardEvent<HTMLDivElement>) => void;
    id: string;
    prompt?: string;
    colors?: Partial<TerminalColors>;
    caretColors?: Partial<TerminalColors>;
};
declare const Input: import("react").ForwardRefExoticComponent<InputProps & import("react").HTMLAttributes<HTMLDivElement> & import("react").RefAttributes<HTMLDivElement>>;
export default Input;
