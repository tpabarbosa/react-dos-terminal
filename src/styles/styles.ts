import styled, { css, keyframes }  from "styled-components";
import { TerminalColors } from "../components/Terminal";
import ls from "../helpers/localStorage";

interface ScreenContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    stripes: boolean;
    colors: {
        color: string;
        background: string;
    },
}

interface ScreenContentProps extends React.HTMLAttributes<HTMLDivElement>{
    // fullscreen: boolean;
}

interface CommandScreenContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    stripes: boolean;
    colors: {
        color: string;
        background: string;
    },
    fullscreen: boolean
}
interface OutputContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    colors?: {
        color?: string;
        background?: string;
    }
}

interface PrintContainerProps extends React.HTMLAttributes<HTMLDivElement>{
    flashing: boolean;
    colors?: {
        color?: string;
        background?: string;
    }
}

interface InputContainerProps extends React.HTMLAttributes<HTMLSpanElement>{
    stripes?: boolean;
    colors?: {
        color?: string;
        background?: string;
    }
}

interface InputCaretProps {
    positionCorrection: number;
    colors?: {
        color?: string;
        background?: string;
    }
}

const getStriped = () => {
    const lsStripes = ls.get('stripes');
    return lsStripes === '1' ? true : false;
}

const getLinkColors = () => {
    const colors = ls.get('colors') as TerminalColors;
    return css`
        color: ${colors.background};
        background: ${colors.color};
    `
}

const getBackground = (striped: boolean, background: string) => {
    return striped ? `repeating-linear-gradient(6deg, ${background}e0 1px, ${background} 6px)` : `${background}`
}

const getColorsCSS = (colors?: {color?: string, background?: string}) => {
    if (colors) {
        return css`
            ${colors.color !== undefined ? `color: ${colors.color};` : ';'} 
            ${colors.background !== undefined ? `background: ${getBackground(getStriped(), colors.background)};` : ';'}
        `;
    }
    return
}

const preStyles = css`
    font-family: 'IBM VGA 9x16', monospace !important;
    font-size: 18px !important;
    line-height: 18px !important;
    outline: none;
    margin: 0;
    white-space: pre-wrap;
    word-wrap: break-word;
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
    text-shadow: 7px 0px 20px #808080a8;
    color:  ${props => props.colors.color};
    background: ${props => getBackground(props.stripes, props.colors.background)};
    a { 
        ${getLinkColors()}
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
    height: ${props => props.fullscreen ? '100%' : 'auto'};
    width: 100%;
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    overflow-y: auto;
    text-align: left;
    padding-bottom: 1px;
    text-shadow: 7px 0px 20px #808080a8;
    color:  ${props => props.colors.color};
    background: ${props => getBackground(props.stripes, props.colors.background)};
`

export const CommandScreenContent = styled.div<ScreenContentProps>`
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

export const OutputContainer = styled.div<OutputContainerProps>`
    outline: none;
    margin: 0;
    ${props => getColorsCSS(props.colors)}
`;

export const OutputContent  = styled.div`
    padding: 4px 8px 0 8px;
`;

export const PrintContainer = styled.div<PrintContainerProps>`

    ${props => props.flashing ? css`
        animation: ${flash} 1.5s infinite; 
        opacity: 0;` : ``
    }
    ${props => getColorsCSS(props.colors)}
`;

export const PrintContent  = styled.div`
`;

export const PrintLine  = styled.pre`
    ${preStyles}
    
`;

export const InputContainer = styled.span<InputContainerProps>`
    padding-left: 8px;
    outline: none;
    margin: 0;
    display: inline-block;

    ${props => getColorsCSS(props.colors)}

    pre {
        display: inline;
        ${preStyles}
    }
`;

export const InputContent  = styled.div`
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
`;

export const InputCaret = styled.span<InputCaretProps>`
    border-bottom: 2px solid;
    animation: ${blink} 1s step-end infinite;
    position: relative;
    top: -3px;
    display: inline-block;
    line-height: 16px;
    left: ${(props) => props.positionCorrection}ch;
    ${props => getColorsCSS(props.colors)}

`;