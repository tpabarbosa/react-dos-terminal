/// <reference types="react" />
import { UseOutputHandler } from "../hooks/useOutputHandler";
import { TerminalColors } from "./Terminal";
interface OutputProps {
    children: React.ReactNode;
    colors?: Partial<TerminalColors>;
}
declare const Output: {
    ({ children, colors, ...rest }: OutputProps & React.HTMLAttributes<HTMLDivElement>): JSX.Element;
    Typewriter: ({ output, flashing, colors, ...rest }: TypewriterProps) => JSX.Element;
    Print: ({ output, flashing, colors, ...rest }: PrintProps & React.HTMLAttributes<HTMLDivElement>) => JSX.Element;
};
interface PrintProps {
    output: string | string[];
    flashing?: boolean;
    colors?: Partial<TerminalColors>;
}
interface TypewriterProps {
    output: UseOutputHandler;
    flashing?: boolean;
    colors?: Partial<TerminalColors>;
}
export default Output;
