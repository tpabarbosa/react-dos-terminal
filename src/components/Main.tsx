import React, { useEffect, useState } from 'react'
import { useTerminalInternal } from '../contexts/TerminalContext'
import { useCommandsHistory } from '../hooks/useCommandsHistory'
import { useInput } from '../hooks/useInput'
import Input from './Input'
import Output from './Output'
import { TerminalScreen } from './TerminalScreen'
import { useCommandsHandler } from '../hooks/useCommandHandler'
import { useMainMachine } from '../hooks/machines/useMainMachine'
import { UserDefinedElement } from './UserDefinedElement'
import { useCommand } from '../contexts/CommandContext'
import fileSystemHelper from '../helpers/filesystem'
import { useFileSystem } from '../contexts/FileSystemContext'

export const Main = () => {
    const [hideOutput, setHideOutput] = useState(false)
    const terminal = useTerminalInternal()

    const filesystem = useFileSystem()
    const { currentDir } = filesystem

    const command = useCommand()
    const dynamic = command.actualCmd?.dynamic

    const input = useInput()
    const commandsHistory = useCommandsHistory({ input: input.ref })

    const { state, action } = useMainMachine()

    const commandsHandler = useCommandsHandler({ state, action })

    const handleKeyUp = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (!terminal.userHasInteracted) {
            terminal.setConfig({ config: 'setUserHasInteracted', value: true })
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
                    <Output.Typewriter output={terminal.output} />
                </Output>
            )}

            {state === 'RUNNING_COMMAND' && dynamic && (
                <UserDefinedElement element={dynamic?.element} />
            )}

            {state !== 'RUNNING_COMMAND' &&
                !terminal.output.typewriter.isTypewriting && (
                    <Input
                        onKeyUp={handleKeyUp}
                        id="terminal_input"
                        ref={input.ref}
                        prompt={fileSystemHelper.formatPrompt(
                            terminal.currentPrompt,
                            currentDir
                        )}
                    />
                )}
        </TerminalScreen>
    )
}
