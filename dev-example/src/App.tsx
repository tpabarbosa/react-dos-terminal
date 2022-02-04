
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
            //autoFocus: false,
        },
        loadingScreen: {
            //shouldShow: 'always',
            messageOrElement: ['Installing my custom terminal','', 'Please wait...', ''],
            loadingTime: 3000,
        },
        shouldPersisteData: false,
        initialMessage: ['This is my custom terminal', '']
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