import './App.css'
import {
    Terminal,
    fileSystemHelper,
    TerminalColors,
    FakeCommand,
    FakeFile,
} from './component-lib/esm'
import { Hangman, hangman } from './components/Hangman/hangman'

export const App = () => {
    const customCommands: FakeCommand[] = [
        {
            name: 'cls',
            // you can change help for a command
            help: undefined,
        },
        {
            name: 'hi',
            // you can create a new command
            action: () => {
                return {
                    output: [
                        {
                            action: 'add',
                            value: ['', 'Hello!! How are you?', ''],
                        },
                    ],
                }
            },
        },
    ]

    const customFiles: FakeFile[] = [
        {
            name: 'readme.txt',
            type: 'file',
            content: 'This is a custom terminal README file.',
            attributes: 's',
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
        },
    ]

    const config = {
        terminal: {
            colors: {
                background: '#0000aa',
                color: '#ffffff',
            } as TerminalColors,
            showOldScreenEffect: false,
            //autoFocus: false,
            initialOutput: ['This is my <span style="color: green">custom</span> terminal', ''],
            formatPrompt: '$d$s$t$_$p$g'
        },
        
        loadingScreen: {
            showLoadingScreen: 'first-time',
            messageOrElement: [
                'Installing my custom terminal',
                '',
                'Please wait...',
                '',
            ],
            loadingTime: 3000,
        },
        commands: {
            customCommands,
            //excludeInternalCommands: ['test-static'],
            //excludeInternalCommands: 'all'
            //shouldAllowHelp: false,
            messages: {
                notFound: 'My custom not Found message'
            },
        },
        shouldPersisteData: false,
        fileSystem: {
            //initialDir: 'system',
            customFiles,
            //useFakeFileSystem: false,
            //excludeInternalFiles: true,
        },
    }

    return (
        // <div id="App">
        //     <h1>react-dos-terminal example</h1>
            <div id="My-Terminal" style={{marginTop: "30px", width: '600px', height: '400px'}}>
                <Terminal config={config} />
            </div>
        // </div>
    )
}
