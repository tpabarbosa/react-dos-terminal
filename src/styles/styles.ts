import styled, { css, keyframes }  from "styled-components";
import { TerminalColors } from "../components/Terminal";
import { defaults, } from "../config";
import ls from "../helpers/localStorage";

interface ScreenContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    stripes?: boolean;
    colors?: {
        color: string;
        background?: string;
    }
}

interface OutputContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    colors?: {
        color: string;
        background?: string;
    }
}

interface PrintContainerProps extends React.HTMLAttributes<HTMLDivElement>{
    stripes?: boolean;
    flashing: boolean;
    colors?: {
        color: string;
        background?: string;
    }
}

interface InputContainerProps extends React.HTMLAttributes<HTMLSpanElement>{
    stripes?: boolean;
    colors?: {
        color: string;
        background?: string;
    }
}

interface InputCaretProps {
    positionCorrection: number;
    colors?: {
        color: string;
        background?: string;
    }
}

const getColor = (value: string | undefined) => {
    const lscolors = ls.get('colors') as unknown;
    const colors = lscolors as TerminalColors ?? null ;
    const color = colors ? colors.color : null;
    return value ?? color ?? defaults.colors.color
}
/* const getBackgroundColor = (value: string | undefined) => {
    return value ?? colors.background
} */
const getBackground = (striped: boolean | undefined, background: string | undefined) => {
    const lscolors = ls.get('colors') as unknown;
    const colors = lscolors as TerminalColors ?? null;
    const back = colors ? colors.background : null;

    const b = background ?? back ?? defaults.colors.background;

    const lsStripes = ls.get('stripes');
    const stripes = striped !== undefined ? striped : lsStripes ? true : false;
    return stripes ? `repeating-linear-gradient(6deg, ${b}e0 1px, ${b} 6px)` : `${b}`
}

const componentsColors = (props: any) => css`
    ${props?.colors ? `
        color: ${getColor(props?.colors?.color)};
        background: ${getBackground(props?.stripes, props?.colors?.background)};` : ''
}`;
        

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
    color: ${props => getColor(props?.colors?.color)};
    background: ${props => getBackground(props?.stripes, props?.colors?.background)};
`

export const ScreenContent = styled.div`
    width: 134%;
    min-height: 100%;
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
    ${(props) => componentsColors(props)}

`;

export const OutputContent  = styled.div`
    padding: 4px 8px 0 8px;
`;

export const PrintContainer = styled.div<PrintContainerProps>`
    ${(props) => componentsColors(props)}

    ${props => props.flashing ? css`
        animation: ${flash} 1.5s infinite; 
        opacity: 0;` : ``
    }
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
    ${(props) => componentsColors(props)}

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

    ${(props) => componentsColors(props)}
`;