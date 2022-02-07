
import './App.css'
import { Terminal } from './component-lib'

export const App = () => {

    const commandsList = [
        {
            name: 'cls',
            // action: () => {return {output: [{action:'add', value:'Subscrevendo um comando'}]}}
            help: 'Sobrescrevendo apenas a ajuda'
        },
        {
            name: 'tati',
            action: () => {return {output: [{action:'add', value:'Olá, meu nome é Tatiana'}]}},
        }
    ]

    const config = {
        terminal: {
            colors:  {
                background: '#0000aa',
                color: '#ffffff',
            },
            screenStripes: true,
            //autoFocus: false,
            messages: {
                initialOutput: ['This is my custom terminal', '']
            }
        },
        loadingScreen: {
            //shouldShow: 'always',
            messageOrElement: ['Installing my custom terminal','', 'Please wait...', ''],
            loadingTime: 3000,
        },
        shouldPersisteData: false,
        commands: {
            commands: commandsList,
            //excludeCommands: ['test-static'],
            //excludeCommands: 'all'
            //shouldAllowHelp: false
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