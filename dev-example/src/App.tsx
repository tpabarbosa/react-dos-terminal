
import './App.css'
import { Terminal } from './component-lib'

export const App = () => {

    const config = {
        terminal: {
            colors:  {
                background: '#0000aa',
                color: '#ffffff',
            },
            screenStripes: true,
            // autoFocus: false,
            //initialMessage: ['This is my custom terminal', '']
        },
        
        loadingScreen: {
            //shouldShow: 'always',
            messageOrElement: ['Installing my custom terminal','', 'Please wait...', ''],
            loadingTime: 3000,
        },
        shouldPersisteData: false,
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