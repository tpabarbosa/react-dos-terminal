import { cls } from "../commands/cls";
import testAsync from "../commands/testAsync";

import { testDynamic } from "../commands/testDynamic";
import { testStatic } from "../commands/testStatic";
import { FakeCommand } from "../contexts/CommandContext";

export const commands: FakeCommand[]  = [
    { 
        name: "test-static",
        alias: ['static'],
        action: testStatic
    },
    { 
        name: "test-dynamic",
        alias: ['dynamic'],
        action: testDynamic
    },
    { 
        name: "test-async",
        alias: ['async'],
        action: testAsync.run,
        async: {waitingMessage: testAsync.waitingMessage}
    },
    { 
        name: "cls",
        action: cls
    }
]