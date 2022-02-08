
import './App.css'
import { Terminal, fileSystemHelper, TerminalColors, FakeCommand, FakeFile } from './component-lib/esm'
import { Hangman, hangman } from './components/Hangman/hangman'

export const App = () => {

    const commandsList: FakeCommand[] = [
        {
            name: 'cls',
            // you can change help for a command
            help: undefined
        },
        {
            name: 'hi',
            // you can create a new command
            action: () => {return {output: [{action:'add', value:['', 'Hello!! How are you?', '']}]}},
        }
    ]

    const files: FakeFile[] = [
        {
            name: 'readme.txt', 
            type: 'file', 
            content: 'This is a custom terminal README file.', 
            attributes: 's'
        },
        {
        name: 'games', 
        type: 'directory', 
        attributes: 's',
        content: [
            {
                name: 'hangman.exe', 
                type: 'exec-file', 
                content: { 
                    name: 'hangman',
                    action: hangman,
                },
                attributes: 's',
                fakeFileSize: fileSystemHelper.getFakeFileSize([Hangman]),
            },
        ],
    }
    ]

    const config = {
        terminal: {
            colors:  {
                background: '#0000aa',
                color: '#ffffff',
            } as TerminalColors,
            screenStripes: true,
            //autoFocus: false,
            messages: {
                initialOutput: ['This is my custom terminal', '']
            }
        },
        loadingScreen: {
            shouldShow: 'first-time',
            messageOrElement: ['Installing my custom terminal','', 'Please wait...', ''],
            loadingTime: 3000,
        },
        commands: {
            commands: commandsList,
            //excludeCommands: ['test-static'],
            //excludeCommands: 'all'
            //shouldAllowHelp: false
        },
        //shouldPersisteData: false,
        fileSystem: {
            //actualDir: 'system',
            files,
            //useFakeFileSystem: false,
            //useInternalFiles: false, 
        }
    }

    return (
        <div id='App'>
            <h1>react-dos-terminal example</h1>
            <div id='My-Terminal'>
                <Terminal config={config}/>
            </div>
        </div>
    )
}