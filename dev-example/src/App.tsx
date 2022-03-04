import { useEffect } from 'react'
import './App.css'
import {
    Terminal,
    fileSystemHelper,
    commandsHelper,
    FakeCommand,
    FakeFile,
    Command,
    Output,
    useOutputHandler,
    CommandScreen,
    colorsHelper,
} from './component-lib/esm'
import { Hangman, hangman } from './components/Hangman/hangman'

const LoadingScreenExample1 = () => {
    return (
        <div style={{margin: '8px'}}>
            <h1>Hello, Terminal!</h1>
            <h2>You can output anything</h2>
            <div> This is just a showcase! </div>
            <div> Loading...</div>
        </div>
    )
}

const LoadingScreenExample2 = () => {
    const outputHandler = useOutputHandler({
        initialOutput: '<h1>Hello, Terminal!</h1>', 
        shouldTypewrite: true
    })

    useEffect(() => {
        outputHandler.typewriter.changeTypeInterval(120)
        outputHandler.addToQueue([
            {action: 'add', value:'<h2>You can output anything</h2>'},
            {action: 'add', value:'This is just a showcase!'},
            {action: 'remove', value: 2}
        ])
    }, [])
    return (
        <CommandScreen fullscreen={true} colors={{
                    background: '#0000aa',
                    color: '#ffffff',
                }}>
            <Output >
                <Output.Typewriter output={outputHandler} />
                {!outputHandler.typewriter.isTypewriting &&
                    <Output.Print output={'Loading...'} flashing={true}/>
                }
            </Output>
        </CommandScreen>
    )
}

export const App = () => {

    const customCommands: FakeCommand[] = [
        {
            name: 'cls',
            // you can change help for a command
            beforeFinishMiddleware: (props, command) => {
                return {...command, configTerminal: { config: 'setColors', value: {color: colorsHelper.getColorByName('red'), background: colorsHelper.getColorByName('white')} }} as Command
            },
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
                                { action: 'remove', value: 1 },
                                //{ action: 'clear' },
                                { action: 'add', value: ['Finished async command', 'Outputing data...'] },
                            ],
                        }
                    },
            async: { waitingMessage: ['Getting something that takes some time...']},
            beforeFinishMiddleware: (props, command) => {
                return {...command, configTerminal: { config: 'setColors', value: {color: colorsHelper.getColorByName('red'), background: colorsHelper.getColorByName('white')} }} as Command
            },
        }
    ]

    const customFiles: FakeFile[] = [
        {
            name: 'Readme.txt',
            type: 'text/plain',
            content: {
                text: 'This is a README file.'
            },
            attributes: 'p',
        },
        {
            name: 'test.bat',
            type: 'application/bat',
            content: {
                    text: 'This is a test',
                    action: ():Command => {return {output: [{action: 'add', value: 'Executed'}]}},
                    help: ['Just a hangman game']
                },
            attributes: 'p',
        },
        {   
            name: 'command.com',
            type: 'application/system', 
            attributes: 'ph', 
            size: 32302,
            content: commandsHelper.isAlreadyRunning, 
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
            //showOldScreenEffect: false,
            //autoFocus: false,
            //initialOutput: [],//['This is my <span style="color: white">custom</span> terminal', ''],
            defaultPrompt: '$p$g',
            // promptCallback: (prompt: string) => {
            //     return prompt.replace(/%count/gi, count.toString())
            // }
            //shouldTypewrite: false
        },
        
        loadingScreen: {
            showLoadingScreen: 'never' as const,
            messageOrElement: <LoadingScreenExample2 />,//[ 'Installing my custom terminal','','Please wait...',''],
            loadingTime: 10000,
        },
        commands: {
            customCommands,
            //excludeInternalCommands: ['ver'],
            //excludeInternalCommands: 'all' as const,
            //shouldAllowHelp: false,
            // messages: {
            //     notFound: 'My custom not Found message'
            // },
        },
        //shouldPersisteUserData: false,
        fileSystem: {
            //initialDir: 'system',
            customFiles,
            //useFakeFileSystem: false,
            //excludeInternalFiles: true,
            systemPaths: ['', 'games', 'system']
        },
    }

    return (
        <div id="App">
             <h1>react-dos-terminal example</h1>
             <div style={{height: '600px'}}>My page elements</div>
             {/* <div id="My-Terminal" style={{marginTop: "30px", width: '600px', height: '400px'}}> */}
             <div id="Test">
                <Terminal config={config} id='myTerminal'/>
            </div>
            <div style={{height: '600px'}}>My page elements
                <input type='text'></input>
            </div>
        </div>
    )
}
