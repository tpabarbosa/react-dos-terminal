import React, { useEffect, useRef, useState } from 'react'
import { useTerminal } from '../contexts/TerminalContext'
import { ScreenContainer, ScreenContent } from '../styles/styles'
import { TerminalColors } from './Terminal'

interface ScreenProps {
    children: React.ReactNode
    colors?: TerminalColors
    oldEffect?: boolean
}

export const TerminalScreen = ({
    children,
    colors,
    oldEffect,
    ...rest
}: ScreenProps & React.HTMLAttributes<HTMLDivElement>) => {
    const terminal = useTerminal()
    const { autoFocus } = terminal
    const [gotFocus, setGotFocus] = useState(false)

    const endRef = useRef<HTMLDivElement>(null)

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        if (!gotFocus && autoFocus && endRef.current) {
            endRef.current.scrollIntoView({ block: 'start' })
            window.scrollBy(0, -8)
            setGotFocus(true)
        }
    })

    return (
        <>
            <div ref={endRef} />
            <ScreenContainer
                colors={colors ?? terminal.colors}
                oldEffect={oldEffect ?? terminal.showOldScreenEffect}
            >
                <ScreenContent {...rest}>{children}</ScreenContent>
            </ScreenContainer>
        </>
    )
}
