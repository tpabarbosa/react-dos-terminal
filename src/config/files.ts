import { help } from "../commands/help";
import { reactDosTerminal } from "../commands/reactDosTerminal";
import { CommandScreen } from "../components/CommandScreen";
import Input from "../components/Input";
import { Main } from "../components/Main";
import Output from "../components/Output";
import { TerminalScreen } from "../components/TerminalScreen";
import { UserDefinedElement } from "../components/UserDefinedElement";
import { TerminalCommandContextProvider } from "../contexts/CommandContext";
import { FakeFile, FileSystemContextProvider, useFileSystem } from "../contexts/FileSystemContext";
import { TerminalContextProvider } from "../contexts/TerminalContext";
import commandsHelper from "../helpers/commands";
import fileSystemHelper from "../helpers/filesystem";
import initializer from "../helpers/initializer";

import { useMainMachine } from "../hooks/machines/useMainMachine";
import { useStateMachine } from "../hooks/machines/useStateMachine";
import { useCaretHandler } from "../hooks/useCaretHandler";
import { useCommandsHandler } from "../hooks/useCommandHandler";
import { useCommandsHistory } from "../hooks/useCommandsHistory";
import { useInput } from "../hooks/useInput";
import { useLoadingScreen } from "../hooks/useLoadingScreen";
import { useOutputHandler } from "../hooks/useOutputHandler";
import { commandsList } from "./commands";

export const files: FakeFile[] = [
    {
        name: 'readme.txt', 
        type: 'file', 
        content: reactDosTerminal.help,
        attributes: 's',
    },
    {
        name: 'system', 
        type: 'directory', 
        attributes: 's',
        content: [
            {
                name: 'doskey.exe', 
                type: 'system-file', 
                attributes: 'sh',
                content: { 
                    name: 'doskey',
                    action: commandsHelper.cantBeExecuted,
                },
                fakeFileSize: fileSystemHelper.getFakeFileSize([useCommandsHistory, useCaretHandler]),
            },
            {
                name: 'help.com', 
                type: 'exec-file', 
                attributes: 's',
                content: { 
                    name: 'help',
                    action: help,
                },
                fakeFileSize: fileSystemHelper.getFakeFileSize(help)
            },
        ],
    },
    {
        name: 'command.com', 
        type: 'system-file', 
        attributes: 'sh',
        content: { 
            name: 'command',
            action: commandsHelper.cantBeExecuted,
        },
        fakeFileSize: fileSystemHelper.getCommandsSize(commandsList) + fileSystemHelper.getFakeFileSize([useCommandsHandler, useCaretHandler, useMainMachine, TerminalCommandContextProvider, CommandScreen]),
    },
    {
        name: 'io.sys', 
        type: 'system-file', 
        attributes: 'sh',
        content: { 
            name: 'io',
            action: commandsHelper.cantBeExecuted,
        },
        fakeFileSize: fileSystemHelper.getFakeFileSize([Main, TerminalScreen, TerminalContextProvider, useLoadingScreen, initializer.createCommands, useStateMachine])
    },
    {
        name: 'msdos.sys', 
        type: 'system-file', 
        attributes: 'sh',
        content: {
            name: 'msdos',
            action: commandsHelper.cantBeExecuted,
        },
        fakeFileSize: fileSystemHelper.getFakeFileSize([useFileSystem, FileSystemContextProvider, () => fileSystemHelper, initializer.createFakeFileSystem, Input, Output, UserDefinedElement, useInput, useOutputHandler ]),
    },
    
]
