import Terminal, { TerminalColors } from "./components/Terminal";
import fileSystemHelper from "./helpers/filesystem";
import {CommandScreen} from "./components/CommandScreen";
import Input from "./components/Input";
import Output from "./components/Output";
import { useInput } from "./hooks/useInput";
import { useTerminalCommand, Command, FakeCommand } from "./contexts/CommandContext";
import { useStateMachine, Machine } from './hooks/machines/useStateMachine';
import colorsHelper from "./helpers/colors";
import { FakeFile } from "./contexts/FileSystemContext";

export { Terminal, CommandScreen, Input, Output, useInput, useTerminalCommand, useStateMachine, fileSystemHelper, colorsHelper }

export type {
    Command, Machine, TerminalColors, FakeCommand, FakeFile
}