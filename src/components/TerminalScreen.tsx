import React, { useEffect, useRef } from "react";
import { useTerminal } from "../contexts/TerminalContext";
import { ScreenContainer, ScreenContent } from "../styles/styles";
import { TerminalColors } from "./Terminal";

interface ScreenProps {
    children: React.ReactNode;
    colors?: TerminalColors;
    stripes?: boolean;
}

export const TerminalScreen = ( { children, colors, stripes, ...rest }: ScreenProps & React.HTMLAttributes<HTMLDivElement>) => {
    const terminal = useTerminal();

    const endRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (endRef.current) {
            endRef.current.scrollIntoView({block: "end"});
        }
    });


    return (
        <ScreenContainer {...rest} colors={colors ?? terminal.state.colors} stripes={stripes ?? terminal.state.screenStripes}>
            <ScreenContent >
                {children}
                <div ref={endRef} /> 
            </ScreenContent>
        </ScreenContainer>
    )
}
