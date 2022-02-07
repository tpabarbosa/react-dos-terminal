import { cls } from "../commands/cls";
import { help } from "../commands/help";
import { reactDosTerminal } from "../commands/reactDosTerminal";
import testAsync from "../commands/testAsync";

import { testDynamic } from "../commands/testDynamic";
import { testStatic } from "../commands/testStatic";
import { FakeCommand } from "../contexts/CommandContext";

export const commandsList: FakeCommand[]  = [
    { 
        name: "test-static",
        alias: ['static'],
        action: testStatic,
        help: ['Help for static command', '']
    },
    { 
        name: "test-dynamic",
        alias: ['dynamic'],
        action: testDynamic,
        help: () => ['Help for dynamic command', '']
    },
    { 
        name: "test-async",
        alias: ['async'],
        action: testAsync.run,
        async: {waitingMessage: testAsync.waitingMessage}
    },
    { 
        name: "cls",
        action: cls.run,
        help: cls.help
    },
    { 
        name: "help",
        alias: ['/?'],
        action: help,
    }
]

export const immutableCommands: FakeCommand[] = [
    {
        name: 'react-dos-terminal',
        action: reactDosTerminal.run,
        help: reactDosTerminal.help
    },
]