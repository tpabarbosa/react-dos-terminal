import Terminal, { TerminalColors } from './components/Terminal'
import fileSystemHelper from './helpers/filesystem'
import { CommandScreen } from './components/CommandScreen'
import Input from './components/Input'
import Output from './components/Output'
import { useInput } from './hooks/useInput'
import {
    useCommand,
    Command,
    FakeCommand,
    CommandProps,
} from './contexts/CommandContext'
import { useStateMachine, Machine } from './hooks/machines/useStateMachine'
import colorsHelper from './helpers/colors'
import commandsHelper from './helpers/commands'
import { FakeFile, useFileSystem } from './contexts/FileSystemContext'
import { useOutputHandler } from './hooks/useOutputHandler'
import { ExcludeCommandsOptions, TerminalLoadingScreenOptions } from './config'
import { useTerminal } from './contexts/TerminalContext'
import { useCommandsHistory } from './hooks/useCommandsHistory'

export {
    Terminal,
    CommandScreen,
    Input,
    Output,
    useTerminal,
    useCommand,
    useFileSystem,
    useOutputHandler,
    useInput,
    useCommandsHistory,
    useStateMachine,
    fileSystemHelper,
    colorsHelper,
    commandsHelper,
}

export type {
    Command,
    CommandProps,
    Machine,
    TerminalColors,
    FakeCommand,
    FakeFile,
    TerminalLoadingScreenOptions,
    ExcludeCommandsOptions,
}
