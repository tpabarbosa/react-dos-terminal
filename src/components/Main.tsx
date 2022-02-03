import { useCommandsHistory } from '../hooks/useCommandsHistory';
import { useInput } from '../hooks/useInput';
import Input from './Input';
import Output from './Output';
import { TerminalScreen } from './TerminalScreen';

export const Main = () => {

    const input = useInput();
    const commandsHistory = useCommandsHistory({input: input.ref});

    const handleKeyUp = (e: React.KeyboardEvent<HTMLDivElement>) => {
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

    return (
        <TerminalScreen >
            <Output>
                <Output.Print typewriter={true} output={['Welcome to IOS react-dos-terminal', '', '']} />
            </Output>

            <Input onKeyUp={handleKeyUp}
                    id="terminal_input" 
                    ref={input.ref} prompt='C:\>'
            />
        </TerminalScreen>
    )
}
