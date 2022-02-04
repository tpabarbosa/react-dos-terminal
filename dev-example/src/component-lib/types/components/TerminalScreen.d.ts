import React from "react";
import { TerminalColors } from "./Terminal";
interface ScreenProps {
    children: React.ReactNode;
    colors?: TerminalColors;
    stripes?: boolean;
}
export declare const TerminalScreen: ({ children, colors, stripes, ...rest }: ScreenProps & React.HTMLAttributes<HTMLDivElement>) => JSX.Element;
export {};
