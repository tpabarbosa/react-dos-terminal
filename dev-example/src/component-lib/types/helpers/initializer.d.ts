import { FakeCommand } from "../contexts/CommandContext";
declare const initializer: {
    createCommands: (internal: FakeCommand[], external?: FakeCommand[] | undefined) => FakeCommand[];
    excludeCommands: (commands: FakeCommand[], toExclude?: string[] | "all" | undefined) => FakeCommand[];
};
export default initializer;
