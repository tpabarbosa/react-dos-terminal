import { Command, CommandProps } from "../contexts/CommandContext";
export declare const cantBeExecuted: ({ name, messages }: CommandProps) => Command;
export declare const helpNotAvailable: ({ name, messages }: CommandProps) => Command;
declare const commandsHelper: {
    commandNotFound: ({ name, messages }: CommandProps) => Command;
    toBeImplemented: ({ name, messages }: CommandProps) => Command;
    cantBeExecuted: ({ name, messages }: CommandProps) => Command;
    helpNotAvailable: ({ name, messages }: CommandProps) => Command;
    link: (href: string, text: string) => string;
};
export default commandsHelper;
