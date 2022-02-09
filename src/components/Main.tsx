import React, { useEffect, useState } from 'react'
import { useTerminal } from '../contexts/TerminalContext'
import { useCommandsHistory } from '../hooks/useCommandsHistory'
import { useInput } from '../hooks/useInput'
import { useOutputHandler } from '../hooks/useOutputHandler'
import Input from './Input'
import Output from './Output'
import { TerminalScreen } from './TerminalScreen'
import { useCommandsHandler } from '../hooks/useCommandHandler'
import { useMainMachine } from '../hooks/machines/useMainMachine'
import { UserDefinedElement } from './UserDefinedElement'
import { useCommand } from '../contexts/CommandContext'
import fileSystemHelper from '../helpers/filesystem'
import { useFileSystem } from '../contexts/FileSystemContext'

export const Main = ({ initialOutput }: { initialOutput: string[] }) => {
    const [hideOutput, setHideOutput] = useState(false)
    const terminal = useTerminal()

    const filesystem = useFileSystem()
    const { actualDir } = filesystem

    const command = useCommand()
    const dynamic = command.actualCmd?.dynamic

    const input = useInput()
    const commandsHistory = useCommandsHistory({ input: input.ref })
    const outputHandler = useOutputHandler(initialOutput)

    const { state, action } = useMainMachine({ outputHandler })

    const commandsHandler = useCommandsHandler({ state, action, outputHandler })

    const handleKeyUp = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (!terminal.isActive) {
            terminal.userHasInteracted()
        }
        switch (e.key) {
            case 'ArrowUp':
                e.preventDefault()
                commandsHistory.up()
                return
            case 'ArrowDown':
                e.preventDefault()
                commandsHistory.down()
                return
            case 'Enter': {
                const cmd = input.getText()
                e.preventDefault()
                commandsHandler.run(cmd)
                input.setText('')
                commandsHistory.add(cmd)
                break
            }
            default:
        }
    }

    useEffect(() => {
        if (
            state === 'RUNNING_COMMAND' &&
            dynamic?.options?.shouldHideTerminalOutput
        ) {
            setHideOutput(true)
        }
        if (state !== 'RUNNING_COMMAND') {
            setHideOutput(false)
        }
    }, [state, dynamic])

    return (
        <TerminalScreen onClick={() => input && input.setFocus()}>
            {!hideOutput && (
                <Output>
                    <Output.Typewriter output={outputHandler} />
                </Output>
            )}

            {state === 'RUNNING_COMMAND' && dynamic && (
                <UserDefinedElement
                    element={dynamic?.element}
                    outputHandler={outputHandler}
                />
            )}

            {state !== 'RUNNING_COMMAND' &&
                !outputHandler.typewriter.isTypewriting && (
                    <Input
                        onKeyUp={handleKeyUp}
                        id="terminal_input"
                        ref={input.ref}
                        prompt={fileSystemHelper.formatPrompt(actualDir)}
                    />
                )}
        </TerminalScreen>
    )
}
