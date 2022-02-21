import React from 'react'
import { useTerminalInternal } from '../contexts/TerminalContext'
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
    const terminal = useTerminalInternal()

    return (
        <CommandScreenContainer
            {...rest}
            colors={colors ?? terminal.colors}
            oldEffect={oldEffect ?? terminal.showOldScreenEffect}
            fullscreen={fullscreen}
        >
            <CommandScreenContent>{children}</CommandScreenContent>
        </CommandScreenContainer>
    )
}
