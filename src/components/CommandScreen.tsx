import React, { useEffect, useRef } from 'react'
import { useTerminal } from '../contexts/TerminalContext'
import { CommandScreenContainer, CommandScreenContent } from '../styles/styles'
import { TerminalColors } from './Terminal'

interface ScreenProps {
    children: React.ReactNode
    colors?: TerminalColors
    oldEffect?: boolean
    fullscreen?: boolean
}

export const CommandScreen = ({
    children,
    colors,
    oldEffect,
    fullscreen = false,
    ...rest
}: ScreenProps & React.HTMLAttributes<HTMLDivElement>) => {
    const terminal = useTerminal()

    const endRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (endRef.current) {
            endRef.current.scrollIntoView({ block: 'end' })
        }
    })

    return (
        <CommandScreenContainer
            {...rest}
            colors={colors ?? terminal.colors}
            oldEffect={oldEffect ?? terminal.showOldScreenEffect}
            fullscreen={fullscreen}
        >
            <CommandScreenContent>
                {children}
                <div ref={endRef} />
            </CommandScreenContent>
        </CommandScreenContainer>
    )
}
