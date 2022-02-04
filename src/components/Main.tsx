import { useEffect } from 'react';
import { useTerminalOutput } from '../contexts/TerminalOutputContext';
import { useTerminal } from '../contexts/TerminalContext';
import { useCommandsHistory } from '../hooks/useCommandsHistory';
import { useInput } from '../hooks/useInput';
import { useOutput } from '../hooks/useOutput';
import Input from './Input';
import Output from './Output';
import { TerminalScreen } from './TerminalScreen';

export const Main = () => {

    const terminal = useTerminal();
    const terminalOutput = useTerminalOutput();

    const input = useInput();
    const commandsHistory = useCommandsHistory({input: input.ref});
    const output = useOutput();

    const handleKeyUp = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (!terminal.state.isActive) {
            terminal.action.userHasInteracted();
        }
        switch (e.key) {
            case 'ArrowUp': 
                e.preventDefault();
                commandsHistory.up()
                return;
            case 'ArrowDown': 
                e.preventDefault();
                commandsHistory.down();
                return;
            case 'Enter': 
                e.preventDefault();
                const cmd = input.getText();
                console.log(cmd)
                // commandsHandler.run(cmd);
                input.setText('');
                commandsHistory.add(cmd);
                return;
            default: return;
        }
    }

    useEffect(()=> {
        output.typewriter.startTypewriting(terminalOutput.state.data);
    },[])
    
    return (
        <TerminalScreen >
            <Output>
                <Output.Typewriter output={output} />
            </Output>

            {!output.typewriter.isTypewriting && 
            <Input onKeyUp={handleKeyUp}
                id="terminal_input" 
                ref={input.ref} prompt='C:\>'
            />
            }
        </TerminalScreen>
    )
}
