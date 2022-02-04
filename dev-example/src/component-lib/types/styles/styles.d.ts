/// <reference types="react" />
interface ScreenContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    stripes: boolean;
    colors: {
        color: string;
        background: string;
    };
}
interface OutputContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    colors?: {
        color?: string;
        background?: string;
    };
}
interface PrintContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    flashing: boolean;
    colors?: {
        color?: string;
        background?: string;
    };
}
interface InputContainerProps extends React.HTMLAttributes<HTMLSpanElement> {
    stripes?: boolean;
    colors?: {
        color?: string;
        background?: string;
    };
}
interface InputCaretProps {
    positionCorrection: number;
    colors?: {
        color?: string;
        background?: string;
    };
}
export declare const ScreenContainer: import("styled-components").StyledComponent<"div", any, ScreenContainerProps, never>;
export declare const ScreenContent: import("styled-components").StyledComponent<"div", any, {}, never>;
export declare const OutputContainer: import("styled-components").StyledComponent<"div", any, OutputContainerProps, never>;
export declare const OutputContent: import("styled-components").StyledComponent<"div", any, {}, never>;
export declare const PrintContainer: import("styled-components").StyledComponent<"div", any, PrintContainerProps, never>;
export declare const PrintContent: import("styled-components").StyledComponent<"div", any, {}, never>;
export declare const PrintLine: import("styled-components").StyledComponent<"pre", any, {}, never>;
export declare const InputContainer: import("styled-components").StyledComponent<"span", any, InputContainerProps, never>;
export declare const InputContent: import("styled-components").StyledComponent<"div", any, {}, never>;
export declare const InputCaret: import("styled-components").StyledComponent<"span", any, InputCaretProps, never>;
export {};
