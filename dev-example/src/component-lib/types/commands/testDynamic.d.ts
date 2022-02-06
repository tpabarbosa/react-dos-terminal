/// <reference types="react" />
import { Command, CommandProps } from "../contexts/CommandContext";
import { UseOutputHandler } from "../hooks/useOutputHandler";
export declare const testDynamic: ({ name, args }: CommandProps) => Command;
export declare const TestDynamicOutput: ({ name, args, outputHandler }: {
    name: string;
    args: string;
    outputHandler?: UseOutputHandler | undefined;
}) => JSX.Element;
