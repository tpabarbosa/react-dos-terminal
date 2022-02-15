# react-dos-terminal

A collection of React Components to mock a DOS command line interface.

[Test it now](https://codesandbox.io/s/7k3iv?file=/src/App.js)

![component screen shot](docs/main.png?raw=true)

It was created using [React](https://github.com/facebook/react) and [Typescript](https://github.com/Microsoft/TypeScript). It also uses [styled-components](https://github.com/styled-components/styled-components) and [Lodash](https://lodash.com/)...

## Table of contents

-   [Installation](#installation)

-   [Usage](#usage)

-   [Configuration](#configuration)

-   [Basics of Custom Commands](#basics-of-custom-commands)

-   [Basics of Custom Files](#basics-of-custom-files)

-   [Loading Screen Examples](#loading-screen-examples)

-   [Components](#components)

-   [Hooks](#hooks)

-   [Helper Methods](#helper-methods)

-   [Commands](#commands)

-   [FileSystem](#filesystem)

## Installation

In a React project, run the following command:

```bash
npm install react-dos-terminal
```

## Usage

To start using it you must import the Terminal component:

```jsx
import React from 'react'
import { Terminal } from 'react-dos-terminal'

const App = () => {
    return (
        <div style={{ width: '600px', height: '400px' }}>
            <Terminal />
        </div>
    )
}

export default App
```

Then,

```bash
npm run start
```

It will fake some installation and in a few seconds you should see something like this:

![component screen shot](docs/initial.png?raw=true)

And that's all you need to have a running terminal!!

![component screen shot](docs/animation.gif?raw=true)

## Configuration

Terminal component accepts an optional **config** object as a prop. In this config object you can define custom commands, files and directories and some other attributes. All attributes are optional:

```ts
{
    terminal: {
        colors: {
            background: AllowedColors,
            color: AllowedColors,
        },
        autoFocus: boolean,
        showOldScreenEffect: boolean,
        initialOutput: string | string[],
        defaultPrompt: string,
        shouldTypewrite: boolean,
    },
    commands: {
        customCommands: FakeCommand[],
        excludeInternalCommands: string[] | 'all' | 'dev',
        shouldAllowHelp: boolean,
        messages: {
            toBeImplemented: string,
            notFound: string,
            cantBeExecuted: string,
            helpNotAvailable: string,
            isAlreadyRunning: string,
        },
    },
    fileSystem: {
        useFakeFileSystem: boolean,
        customFiles: FakeFile[],
        excludeInternalFiles: boolean,
        initialDir: string,
        systemPaths: string[],
    },
    loadingScreen: {
        showLoadingScreen: 'first-time' | 'always' | 'never',
        messageOrElement: string | string[] | JSX.Element,
        loadingTime: number, // in miliseconds
    },
    shouldPersisteUserData: boolean,
}
```

| Property                 | Attribute                   |                                                                                                                                                                             Description                                                                                                                                                                              | Default                                                                                                                                                                                                                                                                                                                                      |
| ------------------------ | :-------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _terminal_               | **colors**                  |                                                                                                                                                                          Set default colors                                                                                                                                                                          | `{ `<br>` background:'#000000',`<br>` color: '#aaaaaa'`<br> `}```                                                                                                                                                                                                                                                                            |
| _terminal_               | **autoFocus**               |                                                                                                                                                                     Enable / disable auto focus                                                                                                                                                                      | `true`                                                                                                                                                                                                                                                                                                                                       |
| _terminal_               | **showOldScreenEffect**     |                                                                                                                                                                  Enable / disable background noise                                                                                                                                                                   | `true`                                                                                                                                                                                                                                                                                                                                       |
| _terminal_               | **initialOutput**           |                                                                  Set text that shows before prompt when terminal is loaded. An empty array `[]`means that prompt will be displayed in the first line of the terminal. An empty string `''` means that prompt will be displayed after an empty line.                                                                  | `['Welcome to IOS react-dos-terminal', '', '']`                                                                                                                                                                                                                                                                                              |
| _terminal_               | **defaultPrompt**           |                                                                                                                                                      Set prompt text ([see prompt command](#internal-commands))                                                                                                                                                      | `'\$p\$g'`                                                                                                                                                                                                                                                                                                                                   |
| _terminal_               | **shouldTypewrite**         |                                                                                                                                                     Enable / disable typewriting effect when printing to output                                                                                                                                                      | `true`                                                                                                                                                                                                                                                                                                                                       |
| _commands_               | **customCommands**          |                                                                                                                                                                   Set custom commands to terminal                                                                                                                                                                    | `[]`                                                                                                                                                                                                                                                                                                                                         |
| _commands_               | **excludeInternalCommands** |                                                                                           Array of commands names to exclude or `'all'`, to exclude all commands (except non fileSystem related), or `'dev'` to exclude dev commands ([see commands](#internal-commands))                                                                                            | `process.env.NODE_ENV === 'development' ? [] : 'dev'`                                                                                                                                                                                                                                                                                        |
| _commands_               | **shouldAllowHelp**         |                                                                                                                                                      Enable / disable `'help'` command and `'/?'` help shortcut                                                                                                                                                      | `true`                                                                                                                                                                                                                                                                                                                                       |
| _commands_               | **messages**                |                                                                                             Set text that is printed by the helper commands ([see more](#helper-methods)). `'%n'` or `'%N'` will be replaced by the command name in lowercase or uppercase, respectively                                                                                             | `{`<br>`toBeImplemented: 'Error: "%n" command hasn't been implemented.',`<br>`notFound: 'Error: "%n" is not a valid command.', `<br>`cantBeExecuted: 'Error: "%n" can't be executed.', `<br>`helpNotAvailable: 'Error: there isn't any help available for command "%n".', `<br>`isAlreadyRunning: 'Error: "%n" is already running.'`<br>` }` |
| _fileSystem_             | **useFakeFileSystem**       |                                                                                                                                                     Enable / disable fileSystem files and also related commands                                                                                                                                                      | `true`                                                                                                                                                                                                                                                                                                                                       |
| _fileSystem_             | **customFiles**             |                                                                                                                                                             Set custom files and directories to terminal                                                                                                                                                             | `[]`                                                                                                                                                                                                                                                                                                                                         |
| _fileSystem_             | **excludeInternalFiles**    |                                                                                                                                                Enable / disable terminal default files ([see more](#internal-files))                                                                                                                                                 | `false`                                                                                                                                                                                                                                                                                                                                      |
| _fileSystem_             | **initialDir**              |                                                                                                                                                                 Set initial path when terminal loads                                                                                                                                                                 | `''` (empty string means root dir)                                                                                                                                                                                                                                                                                                           |
| _fileSystem_             | **systemPaths**             |                                                                Set paths to look for executable files. Empty string `''` means root dir. **‼ Be Careful** if you are using internal files the help command is an executable file, so if you change this option be sure you add `system` to the list.                                                                 | `['', 'system']`                                                                                                                                                                                                                                                                                                                             |
| _loadingScreen_          | **showLoadingScreen**       | Enable / disable a loading screen before starting terminal. It has 3 options: `always`, `never`, `first-time` (this last option means that when user loads terminal for the first time it will show the loading screen, and the information about that will be saved in localStorage, the next time user loads it terminal knows that and won´t show loading screen) | `'first-time'`                                                                                                                                                                                                                                                                                                                               |
| _loadingScreen_          | **messageOrElement**        |                                                                  Set message to show on loading screen. If you pass a `string` or a `string[]` it will be displayed flashing and with a typewriter effect. If you pass a `JSX.Element` it will be rendered ([see more](#loading-screen-examples)).                                                                   | `[ 'Installing IOS react-dos-terminal','','Please wait...','' ],`                                                                                                                                                                                                                                                                            |
| _loadingScreen_          | **loadingTime**             |                                                                                                                                               Set for how long, in miliseconds, the loading screen should be displayed                                                                                                                                               | `5000`                                                                                                                                                                                                                                                                                                                                       |
| _shouldPersisteUserData_ |                             |                                                                                                                                     Enable / disable persistency of user data (currentDir) and configuration (colors and prompt)                                                                                                                                     | `true`                                                                                                                                                                                                                                                                                                                                       |

## Basics of Custom Commands

Each custom command is a FakeCommand object with the following properties:

```ts
interface FakeCommand {
    name: string
    alias?: string[]
    action?: (props: CommandProps) => Command | Promise<Command>
    async?: {
        waitingMessage?: string[]
    }
    help?: (() => string | string[]) | string | string[]
}
```

Take this `FakeCommand` as an example, _action_ is a method that returns a `Command` object. In this case we are just telling terminal that we want to add to output some text...

```ts
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
}
```

![component screen shot](docs/hi_command.png?raw=true)

In case you have to do some async operation, you should use the `async` attribute to indicate to terminal that it has to wait for the command to complete.

```ts
{
    name: 'get',
    action: async (): Promise<Command> => {
        // ...
        const response = await someAsync()
        // ...
        return {
            output: [
                { action: 'remove', value: 1 }, // removes 1 line from output array
                // if you want you can completely clear the output with { action: 'clear' },
                { action: 'add', value: ['Finished async command', 'Outputing data...'] },
            ],
        }
    },
    async: { waitingMessage: ['Getting something that takes some time...'] } // you can just pass async: {} and no waitingMessage will be output
}
```

![component screen shot](docs/async_command.gif?raw=true)

## Basics of Custom Files

Each custom file is a FakeFile object with the following properties:

```ts
interface FakeFile {
    name: string
    type: FakeFileType
    content: string | string[] | FakeFile[] | FakeCommand
    attributes: FakeAttribute
    size?: number
}

type FakeAttribute = 'r' | 'rh' | 'w' | 'wh' | 'p' | 'ph'
type FakeFileType =
    | 'text/plain'
    | 'directory'
    | 'application/executable'
    | 'application/system'
```

Take this `FakeFile[]` as an example:

```ts
[
    {
        name: 'readme.txt',
        type: 'text/plain', // type 'text' can be printed to output with command "type <filename>"
        content: 'This is a README file.',
        attributes: 'p', // attribute 'p' means that the file is protected, it can't be modified by user
        // if you don't provide a size, terminal will calculate it based on content
    },
    {
        name: 'command.com',
        type: 'application/system', // type 'application/system' can be executed, it's content must be a FakeCommand
        attributes: 'ph', // attribute 'h' means that file is hidden and won't be visible by default with command 'dir', but will be visible with 'dir /a:h'
        size: 32302,
        content: commandsHelper.isAlreadyRunning, // 'isAlreadyRunning' is a FakeCommand that you can use for some default responses
    }
    {
        name: 'games',
        type: 'directory', // type 'directory' must have as content a FakeFile[], also directory size will be calculated as a sum of it's contents
        attributes: 'p',
        content: [
            {
                name: 'hangman.exe',
                type: 'application/executable', // type 'application/executable' simulates a program, it's content must be a FakeCommand
                content: {
                    name: 'hangman', // name doesn't have a meaning to fakeFileSystem, but is required by the FakeCommand interface
                    action: hangman, // here hangman is a method that returns a Command
                    help: ['Just a hangman game']
                },
                attributes: 'p',
                size: 38000 // in "bytes"
            },
        ],
    },
]
```

![component screen shot](docs/filesystem.gif?raw=true)

> **!!** FileSystem is not fully implemented yet, it means users can´t create, update or delete 'files', unless you implement those commands by yourself.

## Loading Screen

#### Example 1

The following code will display this loading screen:

![component screen shot](docs/loading_screen_ex1.png?raw=true)

```tsx
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

// your code here
...

// and in config object
loadingScreen: {
    showLoadingScreen: 'always',
    messageOrElement: <LoadingScreenExample1 />,
    loadingTime: 5000,
},
```

#### Example 2

You can also make use of some [components](#components) and [hooks](#hooks) from **react-dos-terminal**. In this example we made use of `useOutputHandler`, to make easier to manage typewriting, and also of `<CommandScreen>`, `<Output>`, `<Output.Print>` and `<Output.Typewriter>`:

```tsx
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
            <Output>
                <Output.Typewriter output={outputHandler} />
                {!outputHandler.typewriter.isTypewriting &&
                    <Output.Print output={'Loading...'} flashing={true}/>
                }
            </Output>
        </CommandScreen>
    )
}

// your code here
...

// and in config object
loadingScreen: {
    showLoadingScreen: 'always',
    messageOrElement: <LoadingScreenExample2 />,
    loadingTime: 10000,
},
```

And that is the result:

![component screen shot](docs/loading_screen_ex2.gif?raw=true)

> **!!** Please notice that typewrite effect completelly ignores HTML while typing.
> Maybe I can change that someday...

## Components

-   ### `<Terminal />`

    This is the main component.

    **props:**

    -   config ([see Configuration](#configuration))

-   ### `<CommandScreen>`

    Creates an environment to run dynamic commands or loading screen.

    **props:**

    -   colors?: TerminalColors
    -   oldEffect?: boolean
    -   fullscreen?: boolean
    -   ...div props

-   ### `<Output>`

    Is a wrapper to all others Output Components.

    **props:**

    -   colors?: TerminalColors
    -   ...div props

    #### `<Output.Print />`

    This is a component for outputting without typewriter effect.

    **props:**

    -   output: string | string[]
    -   flashing?: boolean
    -   colors?: TerminalColors
    -   ...div props

    #### `<Output.Typewriter />`

    This is a component for outputting with typewriter effect.

    **props:**

    -   output: UseOutputHandler ([see useOutputHandler](#hooks))
    -   flashing?: boolean
    -   colors?: TerminalColors
    -   ...div props

-   ### `<Input />`

    This component creates an input prompt to interact with users in dynamic commands.

    **props:**

    -   onClick?: (e: React.MouseEvent) => void
    -   onInput?: (e: React.FormEvent) => void
    -   onKeyUp?: (e: React.KeyboardEvent) => void
    -   onKeyDown?: (e: React.KeyboardEvent) => void
    -   onKeyPress?: (e: React.KeyboardEvent) => void
    -   id: string
    -   ref: ([see useInput](#hooks))
    -   prompt?: string
    -   colors?: TerminalColors
    -   caretColors?: TerminalColors
    -   ...div props

### Hooks

**🚧 this section is under construction 🚧**

-   #### `useTerminal()`

-   #### `useCommand()`

-   #### `useFileSystem()`

-   #### `useOutputHandler()`

-   #### `useInput()`

-   #### `useCommandsHistory()`

-   #### `useStateMachine()`

## Helper Methods

**🚧 this section is under construction 🚧**

-   #### `colorsHelper`

-   #### `commandsHelper`

-   #### `fileSystemHelper`

## Commands

**🚧 this section is under construction 🚧**

#### Internal Commands

-   ##### `cls`

-   ##### `color`

-   ##### `help`

-   ##### `prompt`

-   ##### `ver`

-   ##### `react-dos-terminal`

-   ##### `😎`

#### Development Commands

-   ##### `test-static`

-   ##### `test-async`

-   ##### `test-dynamic`

## FileSystem

**🚧 this section is under construction 🚧**

#### Internal Files

```
\
|---command.com
|---io.sys
|-- msdos.sys
|-- system\
        |-- readme.txt
        |-- doskey.exe
        |-- help.com
```

#### FileSystem related commands

-   ##### `cd`

-   ##### `dir`

-   ##### `type`
