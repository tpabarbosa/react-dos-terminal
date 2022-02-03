/// <reference types="react" />
import { TerminalLoadingScreen } from "../config";
export declare const useLoadingScreen: (config: TerminalLoadingScreen | undefined) => {
    isLoading: boolean;
    content: string | JSX.Element | string[];
};
