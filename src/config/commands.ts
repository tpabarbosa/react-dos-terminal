import { cd } from "../commands/cd";
import { cls } from "../commands/cls";
import { color } from "../commands/color";
import { dir } from "../commands/dir";
import { help } from "../commands/help";
import { hidden } from "../commands/hidden";
import { reactDosTerminal } from "../commands/reactDosTerminal";
import testAsync from "../commands/testAsync";

import { testDynamic } from "../commands/testDynamic";
import { testStatic } from "../commands/testStatic";
import { type } from "../commands/type";
import { ver } from "../commands/ver";
import { FakeCommand } from "../contexts/CommandContext";
import commandsHelper from "../helpers/commands";

export const commandsList: FakeCommand[]  = [
    { 
        name: "test-static",
        alias: ['static'],
        action: testStatic,
    },
    { 
        name: "test-dynamic",
        alias: ['dynamic'],
        action: testDynamic,
    },
    { 
        name: "test-async",
        alias: ['async'],
        action: testAsync.run,
        async: {waitingMessage: testAsync.waitingMessage}
    },
    { 
        name: "cls",
        alias: ['clear'],
        action: cls.run,
        help: cls.help
    },
    { 
        name: "ver",
        action: ver.run,
        help: ver.help
    },
    { 
        name: "color",
        action: color.run,
        help: color.help
    },
    { 
        name: "😎",
        action: hidden,
    },
]

export const immutableCommands: FakeCommand[] = [
    {
        name: 'react-dos-terminal',
        action: reactDosTerminal.run,
    },
]

export const fileSystemCommands: FakeCommand[] = [
    {
        name: 'type',
        action: type.run,
        help: type.help,
    },
    {
        name: 'dir',
        alias: ['ls'], 
        action: dir.run,
        help: dir.help,
    },
    {
        name: 'cd',
        alias: ['cd..', 'cd\\', 'chdir', 'chdir..', 'chdir\\'], 
        action: cd.run,
        help: cd.help,
    },
    {
        name: 'edit',
        action: commandsHelper.toBeImplemented
    },
]

export const fileSystemSubstituteCommands: FakeCommand[] = [
    {
        name: 'help', 
        alias: ['/?'],
        action: help,
    },
    // {
    //     alias: 'hangman', 
    //     action: hangman,
    // },
]