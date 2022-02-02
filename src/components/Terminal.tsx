import React from "react"
import { Main } from "./Main";

const allowedColors = ['#000000', '#0000aa', '#00aa00', '#00aaaa', '#aa0000', '#aa00aa', '#aa5500', '#aaaaaa', '#555555', '#5555ff', '#55ff55', '#55ffff', '#ff5555', '#ff55ff', '#ffff55', '#ffffff'] as const

type AllowedColors = typeof allowedColors[number]

interface TerminalColors {
    background: AllowedColors;
    color: AllowedColors;
}

interface TerminalConfig {
    colors?: TerminalColors,
}

interface TerminalProps {
    config?: TerminalConfig,
}

const Terminal = ({config}: TerminalProps) => {
    console.log(config);
    return (
        <React.StrictMode>
            <Main />
        </React.StrictMode>
    )
}

export default Terminal;