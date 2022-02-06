import { Command } from "../contexts/CommandContext";
export declare const help: string[];
declare const testAsync: {
    run: () => Promise<Command>;
    waitingMessage: string[];
};
export default testAsync;
