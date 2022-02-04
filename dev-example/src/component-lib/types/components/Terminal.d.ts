/// <reference types="react" />
import { TerminalDefaults } from "../config";
import { AllowedColors } from "../helpers/colors";
declare type Colors<T extends string> = {
    [field in T]: AllowedColors;
};
export declare type TerminalColors = Colors<'background' | 'color'>;
interface TerminalProps {
    config: Partial<TerminalDefaults>;
}
declare const Terminal: ({ config }: TerminalProps) => JSX.Element;
export default Terminal;
