
import { useEffect, useMemo, useState } from "react";
import { TerminalColors } from "../components/Terminal";
import { defaults, TerminalCommandsConfig, TerminalConfig } from "../config";
import ls from "../helpers/localStorage";
import {commandsList, immutableCommands} from "../config/commands";
import { FakeCommand } from "../contexts/CommandContext";
import initializer from "../helpers/initializer";

export const useInitializer = (shouldPersisteData: boolean | undefined, terminal: TerminalConfig | undefined, commands: TerminalCommandsConfig | undefined) => {

    const isInstalled = ls.get('i');
    const [isInitialized, setIsInitialized] = useState<boolean>(false);

    const persisteData = shouldPersisteData !== undefined ? shouldPersisteData : defaults.shouldPersisteData;

    const [finalColors, setFinalColors] = useState<TerminalColors>(defaults.terminal.colors);
    
    const [finalStripes, setFinalStripes] = useState<boolean>(defaults.terminal.screenStripes);

    const finalAutofocus = terminal?.autoFocus !== undefined ? terminal.autoFocus : defaults.terminal.autoFocus;

    const finalMessages = {...defaults.commands.messages, ...commands?.messages}
    
    const finalExcludeCommands = commands?.excludeCommands !== undefined ? commands.excludeCommands : defaults.commands.excludeCommands;

    const finalAllowHelp = commands?.shouldAllowHelp !== undefined ? commands.shouldAllowHelp : defaults.commands.shouldAllowHelp;

    const finalCommands = useMemo(() => {
        let cmd: FakeCommand[];
        // if (config?.fakeFileSystem !== false) {
        //     const fc = commands.concat(fileSystemCommands);
        //     cmd = initializer.createCommands(fc, config?.commands);
        // }
        // else {
        //     const fc = commands.concat(fileSystemSubstituteCommands);
        //     cmd = initializer.createCommands(fc, config?.commands);
        // }
        cmd = initializer.excludeCommands(commandsList, commands?.excludeCommands)
        if (!finalAllowHelp) {
            cmd = initializer.excludeCommands(cmd, ['help']);
        }
        cmd = initializer.createCommands(cmd, commands?.commands)
        //console.log(t)
        
        //return t
        return initializer.createCommands(cmd, immutableCommands);

    }, [commands]);


    useEffect(() => {
        let col: TerminalColors;
        let strip: boolean;
        if ((isInstalled === null || isInstalled === '0') || !persisteData) {
            col = terminal?.colors ? terminal?.colors : defaults.terminal.colors
            strip = (terminal?.screenStripes !== undefined ? terminal?.screenStripes : defaults.terminal.screenStripes);
            ls.set('stripes', strip ? '1' : '0');
            ls.set('colors', col);
            ls.set('i', '1');
        }
        else {
            col = ls.get('colors') as TerminalColors;
            strip = ls.get('stripes')==='1' ? true : false;
        }

        setFinalColors(col);
        setFinalStripes(strip);
        setIsInitialized(true);
    },[])

    return {
        terminal: {
            colors: finalColors,
            screenStripes: finalStripes,
            autoFocus: finalAutofocus,
        },
        commands: { 
            commands: finalCommands,
            shouldAllowHelp:finalAllowHelp,
            excludeCommands: finalExcludeCommands,
            messages: finalMessages,
        },
        isInitialized,
    }
}