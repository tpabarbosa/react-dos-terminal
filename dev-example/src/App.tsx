
import './App.css'
import { Terminal } from './component-lib'

export const App = () => {

    return (
        <div id='App'>
            <h1>Isso é um teste</h1>
            <div className='my-terminal'>
                <Terminal />
            </div>
        </div>
    )
}