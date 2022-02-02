/// <reference types="react" />
declare const allowedColors: readonly ["#000000", "#0000aa", "#00aa00", "#00aaaa", "#aa0000", "#aa00aa", "#aa5500", "#aaaaaa", "#555555", "#5555ff", "#55ff55", "#55ffff", "#ff5555", "#ff55ff", "#ffff55", "#ffffff"];
declare type AllowedColors = typeof allowedColors[number];
interface TerminalColors {
    background: AllowedColors;
    color: AllowedColors;
}
interface TerminalConfig {
    colors?: TerminalColors;
}
interface TerminalProps {
    config?: TerminalConfig;
}
declare const Terminal: ({ config }: TerminalProps) => JSX.Element;
export default Terminal;
