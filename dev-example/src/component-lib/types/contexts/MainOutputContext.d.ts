/// <reference types="react" />
import { MainOutputConfig } from "../config";
export interface MainOutputContextAPI {
    state: MainOutputState;
    action: {
        addLines: (output: string | string[]) => void;
        delLastLines: (number: number) => void;
        clear: () => void;
    };
}
export interface MainOutputState {
    data: string[];
}
export declare type MainOutputProviderProps = {
    children: React.ReactNode;
    config: MainOutputConfig;
};
export declare const MainOutputContextProvider: ({ children, config }: MainOutputProviderProps) => JSX.Element;
export declare const useMainOutput: () => MainOutputContextAPI;
