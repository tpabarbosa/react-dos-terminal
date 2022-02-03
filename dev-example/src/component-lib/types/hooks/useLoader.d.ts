import { TerminalLoadingScreen } from "../config";
export declare const useLoader: (config: TerminalLoadingScreen | undefined) => {
    isLoading: boolean;
    content: string | string[] | JSX.Element;
};
