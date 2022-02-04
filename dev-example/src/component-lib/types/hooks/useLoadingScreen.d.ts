/// <reference types="react" />
import { TerminalLoadingScreen } from "../config";
export interface UseLoadingScreen {
    isLoading: boolean;
    content: string | string[] | JSX.Element;
}
export declare const useLoadingScreen: (config: TerminalLoadingScreen | undefined) => UseLoadingScreen;
