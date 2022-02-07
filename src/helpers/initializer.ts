import _ from "lodash";
import { FakeCommand } from "../contexts/CommandContext";

const createCommands = (internal: FakeCommand[], external?: FakeCommand[]) => {
    if (!external) {
        return internal;
    }
    const internalCommands = internal.reduce((acc, intCmd) => {
        const equalCmd = external.filter(extCmd => intCmd.name === extCmd.name)
        if (equalCmd.length > 0) {
            acc.push({...intCmd, ...equalCmd[0]});
        } else {
            acc.push(intCmd);
        }
        return acc;     
    }, [] as FakeCommand[]);

    const uniqueExternalCommands = external.reduce((acc, cmd) => {
        const found = internalCommands.filter(c => _.isEqual(cmd.name, c.name))
        !found[0] && acc.push(cmd) 
        return acc    
    }, [] as FakeCommand[])

    return [...internalCommands, ...uniqueExternalCommands]
}

const excludeCommands = (commands: FakeCommand[], toExclude?: string[] | 'all') => {
    if (!toExclude || toExclude.length === 0) {
        return commands;
    }

    if (toExclude === 'all') {
        return [] as FakeCommand[];
    }
    
    const finalCommands = commands.filter(command => !toExclude.includes(command.name));

    return finalCommands;
}

const initializer = {
    // createFakeFileSystem,
    createCommands,
    excludeCommands,
}

export default initializer