import React from "react";
import { TerminalColors } from "./Terminal";
interface ScreenProps {
    children: React.ReactNode;
    colorsName?: TerminalColors;
    colors?: {
        color: string;
        background: string;
    };
    stripes?: boolean;
}
export declare const TerminalScreen: ({ children, colors, stripes, ...rest }: ScreenProps & React.HTMLAttributes<HTMLDivElement>) => JSX.Element;
export {};
