/// <reference types="react" />
declare type CommandsHistoryProps = {
    input: React.RefObject<HTMLDivElement>;
};
export declare const useCommandsHistory: ({ input }: CommandsHistoryProps) => {
    add: (cmd: string) => void;
    up: () => string;
    down: () => string;
    length: number;
};
export {};
