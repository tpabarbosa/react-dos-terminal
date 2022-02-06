import React from "react";
import { TerminalColors } from "./Terminal";
interface ScreenProps {
    children: React.ReactNode;
    colors?: TerminalColors;
    stripes?: boolean;
    fullscreen?: boolean;
}
export declare const CommandScreen: ({ children, colors, stripes, fullscreen, ...rest }: ScreenProps & React.HTMLAttributes<HTMLDivElement>) => JSX.Element;
export {};
