import Input from './Input';
import Output from './Output';
import { TerminalScreen } from './TerminalScreen';

export const Main = () => {

    return (
        <TerminalScreen >
            <Output>
                <Output.Print typewriter={true} flashing={true} output={['Welcome to IOS react-dos-terminal', '', '']} />
            </Output>
            <Input id='main-input' prompt='C:\>'/>
        </TerminalScreen>
    )
}
