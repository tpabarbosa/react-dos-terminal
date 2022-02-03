
import './App.css'
import { Terminal } from './component-lib'

export const App = () => {

    const config = {
        // colors:  {
        // background: '#0000aa',
        // color: '#ffffff',
        // },
        screenStripes: false,
        loadingScreen: {
            shouldShow: 'always',
            messageOrElement: ['Installing my custom terminal','', 'Please wait...', '',],
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