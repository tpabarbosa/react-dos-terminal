

import _ from "lodash";
import { help } from "../commands/help";
import { Command, CommandProps, FakeCommand, useTerminalCommand } from "../contexts/CommandContext";
import { useFileSystem } from "../contexts/FileSystemContext";
import { useTerminal } from "../contexts/TerminalContext";
import commandsHelper from "../helpers/commands";
import commands from "../helpers/commands";
import fileSystemHelper from "../helpers/filesystem";
import { MainAction, MainState } from "./machines/useMainMachine";
import { UseOutputHandler } from "./useOutputHandler";

type UseCommandsHandlerProps = {
    state: MainState,
    action: (action: MainAction, arg?:any) => void,
    outputHandler: UseOutputHandler
}

export const useCommandsHandler =  ({action, outputHandler}: UseCommandsHandlerProps) => {
    
    const terminal = useTerminal();
    const filesystem = useFileSystem();
    const command = useTerminalCommand();
    const {messages, shouldAllowHelp} = command.state;
    const { actualDir, allFiles:files } = filesystem.state;
    
    const { allCommands } = command.state;

    const run = async (cmd: string) => {

        const { name, args, isHelp } = getNameAndArgs(cmd);

        outputHandler.addToHistory(`${fileSystemHelper.formatPrompt(actualDir)} ${cmd}`)

        if (name === '') {
            command.action.setActualCmd(null);
            return;
        };

        const props = {name, args, allCommands, messages, actualDir, files};

        const dispatch = (response: Command, waitingMessage?: string[]) => {

            command.action.setActualCmd({name, args, waitingMessage, ...response})

            if (response.configTerminal !== undefined) {
                terminal.action.setConfig(response.configTerminal);
                if (response.configTerminal.config==='actualDir') {
                    filesystem.action.setActualDir(response.configTerminal.value)
                }
            }
            
            if (response.output) {
                outputHandler.addToQueue(response.output);
            }

            !waitingMessage && command.action.startRunningCommand();
            response.dynamic ? action('NEW_CMD', 'dynamic') : action('NEW_CMD', 'static');
        }

        const runAction = async (command: FakeCommand) => {
            const waitingMessage = command?.async?.waitingMessage;
            if (waitingMessage) {
                outputHandler.addToQueue([{action: 'add', value: waitingMessage}]);
                action('NEW_CMD', 'async');
            }

            if (command.action) {
                const response = await command.action(props);
                dispatch(response, waitingMessage);
                return
            }
            
            dispatch(commandsHelper.commandNotFound(props));
        }

        const runHelp = (command: FakeCommand) => {
            if (command.help) {
                dispatch(help({...props, name:'help', args:name}))
            }
            else {
                dispatch(commands.helpNotAvailable(props))
            }
        }

        const terminalCommand: FakeCommand[] = allCommands.filter(c => c.name.toLowerCase() === name.toLowerCase() || (c.alias?.find(a => a.toLowerCase().includes(name.toLowerCase()))));

        if (terminalCommand[0]){ //try internal commands
            isHelp ? runHelp(terminalCommand[0]) : runAction(terminalCommand[0]);
        } 
        else {//try exec-files
            const executableCommand = executable(props);
            if (executableCommand) {
                isHelp ? runHelp(terminalCommand[0]) : runAction(executableCommand);
            }
            else { // is not a valid command
                dispatch(commandsHelper.commandNotFound(props));
            }
        }
    }

    const getNameAndArgs = (cmd:string) => {
        const index = cmd.indexOf(" "); 
        let name = '';
        let args = '';
        let isHelp = false;

        if (index !== -1) {
            name = cmd.substring(0, index).trim(); 
            args = cmd.substring(index + 1).trim();
        } else {
            name = cmd.trim();
        }
        
        if (shouldAllowHelp) {
            const reg = /\/\?/;
            if (reg.test(name) && name!=='/?') {
                isHelp = true;
                name = name.substring(0, name.length-2);
            } else if (args === '/?'){
                isHelp = true;
            } else if (!reg.test(name) && name ==='/?') {
                isHelp = true;
            }
        }
        return {name, args, isHelp}
    }
    

    const executable = ({name, files, actualDir}: CommandProps) => {
        if (_.isEmpty(files)) {
            return 
        }

        const pathsToSearch = [actualDir, '', '\\system'];

        const cmd = pathsToSearch.reduce((acc, path) => {
            if (_.isEmpty(acc)) {
                const dirContent = fileSystemHelper.getDir(files, path);

                if (dirContent && dirContent.files) {
                    if (dirContent.files[name] && (dirContent.files[name].t==='e' || dirContent.files[name].t==='s')) {
                        return dirContent.files[name].c as FakeCommand;
                    }
                    else if (dirContent.files[name+'.com'] && (dirContent.files[name+'.com'].t==='e' || dirContent.files[name+'.com'].t==='s')) {
                        return dirContent.files[name+'.com'].c as FakeCommand;
                    }
                    else if (dirContent.files[name+'.exe'] && (dirContent.files[name+'.exe'].t==='e' || dirContent.files[name+'.exe'].t==='s')) {
                        return dirContent.files[name+'.exe'].c as FakeCommand;
                    }
                }
            } 
            return acc
        }, {} as FakeCommand)

        if (!_.isEmpty(cmd)) {
            
            return cmd
        }

        return
    }

    return { 
        run,
    }
}