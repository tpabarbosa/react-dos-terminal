/// <reference types="react" />
import { TerminalColors } from "./Terminal";
interface OutputProps {
    children: React.ReactNode;
    colors?: Partial<TerminalColors>;
}
declare const Output: {
    ({ children, colors, ...rest }: OutputProps & React.HTMLAttributes<HTMLDivElement>): JSX.Element;
    Print: ({ output, typewriter, toggleTypewriting, isTypewriting, typeInterval, flashing, colors, ...rest }: PrintProps & React.HTMLAttributes<HTMLDivElement>) => JSX.Element;
};
interface PrintProps {
    output: string | string[];
    flashing?: boolean;
    typewriter?: boolean;
    typeInterval?: number;
    toggleTypewriting?: (value: boolean) => void;
    isTypewriting?: boolean;
    colors?: Partial<TerminalColors>;
}
export default Output;
