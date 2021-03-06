import styled, { css, keyframes } from 'styled-components'
import { TerminalColors } from '../components/Terminal'

interface ScreenContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    oldEffect: boolean
    colors: TerminalColors
}

type ScreenContentProps = React.HTMLAttributes<HTMLDivElement>

interface CommandScreenContainerProps
    extends React.HTMLAttributes<HTMLDivElement> {
    oldEffect: boolean
    colors?: TerminalColors
    fullscreen: boolean
}
interface OutputContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    colors?: Partial<TerminalColors>
}

interface PrintContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    flashing: boolean
    colors?: Partial<TerminalColors>
}

interface InputContainerProps extends React.HTMLAttributes<HTMLSpanElement> {
    colors?: Partial<TerminalColors>
}

interface InputCaretProps {
    positionCorrection: number
    colors?: Partial<TerminalColors>
}

const getBackground = (
    striped: boolean | undefined,
    background: string | undefined
) => {
    // eslint-disable-next-line max-len
    const text = `repeating-linear-gradient(6deg, ${background}e0 1px, ${background} 6px)`
    return striped ? text : `${background}`
}

const getColorsCSS = (
    colors?: Partial<TerminalColors>,
    oldEffect?: boolean
) => {
    const text = `background: ${getBackground(oldEffect, colors?.background)};`
    if (colors) {
        return css`
            ${colors.color !== undefined ? `color: ${colors.color};` : ';'}
            ${colors.background !== undefined ? text : ';'}
        `
    }
    return ';'
}

const preStyles = css`
    font-family: 'IBM VGA 9x16', monospace !important;
    font-size: 18px !important;
    line-height: 18px !important;
    outline: none !important;
    margin: 0 !important;
    white-space: pre-wrap !important;
    word-wrap: break-word !important;
    border: 0 !important;
    background-color: transparent !important;
    border-radius: 0 !important;
    padding: 0 !important;
`

const flash = keyframes`
    50% {
        opacity: 1;
    }
`
const blink = keyframes`
    50% {
    border-color: transparent;
    }
`

export const ScreenContainer = styled.div<ScreenContainerProps>`
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    overflow-y: auto;
    text-align: left;
    padding-bottom: 1px;
    ${(props) =>
        props.oldEffect
            ? css`
                  text-shadow: 7px 0px 20px #808080a8;
              `
            : ''}
    ${(props) => getColorsCSS(props.colors, props.oldEffect)};
    a {
        color: ${(props) => props.colors.background};
        background-color: ${(props) => props.colors.color};
    }

    ::-webkit-scrollbar {
        width: 8px;
    }

    ::-webkit-scrollbar:horizontal {
        height: 16px;
    }

    ::-webkit-scrollbar-corner {
        background: #555;
    }

    ::-webkit-scrollbar-track {
        background: ${(props) => props.colors.background};
    }

    ::-webkit-scrollbar-thumb {
        background: ${(props) =>
            // eslint-disable-next-line max-len
            `repeating-linear-gradient(6deg, ${props.colors.color}e0 1px, ${props.colors.color} 3px)`};
    }
`

export const ScreenContent = styled.div<ScreenContentProps>`
    width: 134%;
    height: 100%;
    word-break: break-all;
    font-family: 'IBM VGA 9x16', monospace !important;
    font-size: 18px !important;
    line-height: 18px !important;
    transform: scaleX(0.75);
    position: relative;
    left: -16.7%;
`
export const CommandScreenContainer = styled.div<CommandScreenContainerProps>`
    height: ${(props) => (props.fullscreen ? '100%' : 'auto')};
    ${(props) => getColorsCSS(props.colors, props.oldEffect)}
`

export const CommandScreenContent = styled.div<ScreenContentProps>``

export const OutputContainer = styled.div<OutputContainerProps>`
    outline: none;
    margin: 0;
    ${(props) => getColorsCSS(props.colors)}
`

export const OutputContent = styled.div`
    padding: 4px 8px 0 8px;
`

export const PrintContainer = styled.div<PrintContainerProps>`
    ${(props) =>
        props.flashing
            ? css`
                  animation: ${flash} 1.5s infinite;
                  opacity: 0;
              `
            : ``}
    ${(props) => getColorsCSS(props.colors)}
`

export const PrintContent = styled.div``

export const PrintLine = styled.pre`
    ${preStyles}
`

export const InputContainer = styled.span<InputContainerProps>`
    padding-left: 8px;
    outline: none;
    margin: 0;
    display: inline-block;

    ${(props) => getColorsCSS(props.colors)}

    pre {
        display: inline;
        ${preStyles}
    }
`

export const InputContent = styled.div`
    display: inline;
    outline: none;
    visibility: visible;
    caret-color: transparent;
    outline: none;
    margin: 0;
    padding-left: 8px;

    ::selection {
        color: black;
        background: gray;
    }
`

export const InputCaret = styled.span<InputCaretProps>`
    border-bottom: 2px solid;
    animation: ${blink} 1s step-end infinite;
    position: relative;
    top: -3px;
    display: inline-block;
    line-height: 16px;
    left: ${(props) => props.positionCorrection}ch;
    ${(props) => getColorsCSS(props.colors)}
`
