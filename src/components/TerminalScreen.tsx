import React, { useEffect, useRef } from "react";
import { ScreenContainer, ScreenContent } from "../styles/styles";
import { TerminalColors } from "./Terminal";

interface ScreenProps {
    children: React.ReactNode;
    colorsName?: TerminalColors,
    colors?: {
        color: string;
        background: string;
    };
    stripes?: boolean;
}

export const TerminalScreen = ( { children, colors, stripes=true, ...rest }: ScreenProps & React.HTMLAttributes<HTMLDivElement>) => {

    const endRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (endRef.current) {
            endRef.current.scrollIntoView({block: "end"});
        }
    });


    return (
        <ScreenContainer {...rest} colors={colors} stripes={stripes}>
            <ScreenContent >
                {children}
                <div ref={endRef} /> 
            </ScreenContent>
        </ScreenContainer>
    )
}
