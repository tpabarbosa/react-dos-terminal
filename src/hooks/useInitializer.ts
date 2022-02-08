
import { useEffect, useMemo, useState } from "react";
import { TerminalColors } from "../components/Terminal";
import { defaults, TerminalCommandsConfig, TerminalConfig, TerminalDefaults, } from "../config";
import ls from "../helpers/localStorage";
import {commandsList, fileSystemCommands, fileSystemSubstituteCommands, immutableCommands} from "../config/commands";
import { FakeCommand } from "../contexts/CommandContext";
import initializer from "../helpers/initializer";
import { files } from "../config/files";
import { FileSystemState } from "../contexts/FileSystemContext";

export const useInitializer = (config: Partial<TerminalDefaults>) => {

    const isInstalled = ls.get('i');
    const [isInitialized, setIsInitialized] = useState<boolean>(false);

    const persisteData = config?.shouldPersisteData !== undefined ? config.shouldPersisteData : defaults.shouldPersisteData;

    const [finalColors, setFinalColors] = useState<TerminalColors | undefined>(defaults.terminal.colors);
    
    const [finalStripes, setFinalStripes] = useState<boolean | undefined>(defaults.terminal.screenStripes);

    const [finalActualDir, setFinalActualDir] = useState<string | undefined>(defaults.fileSystem.actualDir);

    const finalAutofocus = config?.terminal?.autoFocus !== undefined ? config.terminal.autoFocus : defaults.terminal.autoFocus;

    const finalMessages = {...defaults.commands.messages, ...config?.commands?.messages}
    
    const finalExcludeCommands = config?.commands?.excludeCommands !== undefined ? config.commands.excludeCommands : defaults.commands.excludeCommands;

    const finalAllowHelp = config?.commands?.shouldAllowHelp !== undefined ? config.commands.shouldAllowHelp : defaults.commands.shouldAllowHelp;

    const finalCommands = useMemo(() => {
        let cmd: FakeCommand[];
        
        if (config?.fileSystem?.useFakeFileSystem !== false) {
            const fc = commandsList.concat(fileSystemCommands);
            cmd = initializer.createCommands(fc, config?.commands?.commands);
        }
        else {
            const fc = commandsList.concat(fileSystemSubstituteCommands);
            cmd = initializer.createCommands(fc, config?.commands?.commands);
        }
        if (config?.fileSystem?.useInternalFiles === false) {
            cmd = initializer.createCommands(cmd, fileSystemSubstituteCommands)
        }

        if (!finalAllowHelp) {
            cmd = initializer.excludeCommands(cmd, ['help']);
        }
        cmd = initializer.createCommands(cmd, config?.commands?.commands)

        return initializer.createCommands(cmd, immutableCommands);

    }, [config?.commands]);

    const finalFiles = useMemo(() => {
        if (config?.fileSystem?.useFakeFileSystem !== false && config?.fileSystem?.useInternalFiles !== false ) {
            return initializer.createFakeFileSystem(files, config?.fileSystem?.files)
        }
        else if (config?.fileSystem.useFakeFileSystem !== false && config?.fileSystem.useInternalFiles === false && config.fileSystem.files) {
            return initializer.createFakeFileSystem(config.fileSystem.files)
        }
        else {
            return initializer.createFakeFileSystem()
        }
    
    } , [config]);

    useEffect(() => {
        let col: TerminalColors  | undefined;
        let strip: boolean | undefined;
        let actualD: string | undefined;
        if ((isInstalled === null || isInstalled === '0') || !persisteData) {
            col = config?.terminal?.colors ? config?.terminal?.colors : defaults.terminal.colors
            strip = (config?.terminal?.screenStripes !== undefined ? config?.terminal?.screenStripes : defaults.terminal.screenStripes);
            actualD = config?.fileSystem?.actualDir !== undefined ? config?.fileSystem?.actualDir :  defaults.fileSystem.actualDir;
            ls.set('stripes', strip ? '1' : '0');
            col && ls.set('colors', col);
            ls.set('i', '1');
        }
        else {
            col = ls.get('colors') as TerminalColors;
            strip = ls.get('stripes')==='1' ? true : false;
            actualD = ls.get('actualDir') as string;
        }

        setFinalColors(col);
        setFinalStripes(strip);
        setFinalActualDir(actualD);
        setIsInitialized(true);
    },[])

    return {
        terminal: {
            colors: finalColors,
            screenStripes: finalStripes,
            autoFocus: finalAutofocus,
        } as TerminalConfig,
        commands: { 
            commands: finalCommands,
            shouldAllowHelp:finalAllowHelp,
            excludeCommands: finalExcludeCommands,
            messages: finalMessages,
        } as TerminalCommandsConfig,
        isInitialized,
        fileSystem: {
            actualDir: finalActualDir,
            allFiles: finalFiles,
        } as FileSystemState
    }
}