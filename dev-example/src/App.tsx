import './App.css'
import {
    Terminal,
    fileSystemHelper,
    TerminalColors,
    FakeCommand,
    FakeFile,
    Command,
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
            alias: ['hello'],
            action: () => {
                return {
                    output: [
                        { action: 'add', value: 'Hello!! How are you?' }
                    ],
                }
            },
            help: 'This command prints a hello message in terminal output'
        },
        {
            name: 'get',
            action: async (): Promise<Command> => {
                        const callAsync = async () => {
                            return new Promise((resolve) => {
                                setTimeout(() => {
                                    resolve(true)
                                }, 3000)
                            })
                        }

                        await callAsync().then()

                        return {
                            output: [
                                // { action: 'remove', value: 1 },
                                { action: 'clear' },
                                { action: 'add', value: ['Finished async command', 'Outputing data...'] },
                            ],
                        }
                    },
            async: {waitingMessage: ['Getting something that takes some time...']}
        }
    ]

    const customFiles: FakeFile[] = [
        {
            name: 'readme.txt',
            type: 'text/plain',
            content: 'This is a custom terminal README file.',
            attributes: 'p',
        },
        {   
            name: 'system',
            type: 'directory',
            attributes: 'p',
            content: [
                { 
                    name: 'example.txt',
                    type: 'text/plain',
                    content: 'This is an example.',
                    attributes: 'p',
                },
            ],
        },
        {
            name: 'games',
            type: 'directory',
            attributes: 'p',
            content: [
                {
                    name: 'hangman.exe',
                    type: 'application/executable',
                    content: {
                        name: 'hangman',
                        action: hangman,
                        help: ['Just a hangman game']
                    },
                    attributes: 'p',
                    size: fileSystemHelper.getFakeFileSize([Hangman]),
                },
            ],
        },
    ]

    const config = {
        terminal: {
            // colors: {
            //     background: '#0000aa',
            //     color: '#ffffff',
            // } as TerminalColors,
            showOldScreenEffect: false,
            //autoFocus: false,
            initialOutput: ['This is my <span style="color: green">custom</span> terminal', ''],
            formatPrompt: '$p$g',
            shouldTypewrite: false
        },
        
        loadingScreen: {
            showLoadingScreen: 'always',
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
        shouldPersisteUserData: false,
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
