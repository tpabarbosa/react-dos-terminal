import { useEffect, useState } from 'react';
import { useTerminal } from '../contexts/TerminalContext';
import { useCommandsHistory } from '../hooks/useCommandsHistory';
import { useInput } from '../hooks/useInput';
import { useOutputHandler } from '../hooks/useOutputHandler';
import Input from './Input';
import Output from './Output';
import { TerminalScreen } from './TerminalScreen';
import { useCommandsHandler } from '../hooks/useCommandHandler';
import { useMainMachine } from '../hooks/machines/useMainMachine';
import { UserDefinedElement } from './UserDefinedElement';
import { useTerminalCommand } from '../contexts/CommandContext';

export const Main = () => {
    const [hideOutput, setHideOutput] = useState(false);
    const terminal = useTerminal();

    const command = useTerminalCommand();
    const dynamic = command.state?.actualCmd?.dynamic;

    const input = useInput();
    const commandsHistory = useCommandsHistory({input: input.ref});
    const outputHandler = useOutputHandler(terminal.state.messages.initialOutput);

    const {state, action} = useMainMachine({outputHandler})

    const commandsHandler = useCommandsHandler({state, action, outputHandler});

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
                commandsHandler.run(cmd);
                input.setText('');
                commandsHistory.add(cmd);
                return;
            default: return;
        }
    }

    useEffect(() => {
        if (state==='RUNNING_COMMAND' && dynamic?.options?.shouldHideTerminalOutput) {
            setHideOutput(true);
        } 
        if (state!=='RUNNING_COMMAND') {
            setHideOutput(false);
        }
    }, [state, dynamic])
    
    return (
        <TerminalScreen >
            { !hideOutput &&
            <Output>
                <Output.Typewriter output={outputHandler} />
            </Output>
            }
            
            { state==='RUNNING_COMMAND' && dynamic && 
                <UserDefinedElement element={dynamic?.element} outputHandler={outputHandler}/> 
            }

            {(state!=='RUNNING_COMMAND' && !outputHandler.typewriter.isTypewriting) && 
            <Input onKeyUp={handleKeyUp}
                id="terminal_input" 
                ref={input.ref} prompt='C:\>'
            />
            }
        </TerminalScreen>
    )
}
