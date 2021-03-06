/* eslint-disable max-len */
import React, { useState } from 'react'
import Input from '../components/Input'
import Output from '../components/Output'
import { Command, CommandProps } from '../contexts/CommandContext'
import colorsHelper from '../helpers/colors'
import { useInput } from '../hooks/useInput'
import { CommandScreen } from '../components/CommandScreen'
import { useTerminal } from '../hooks/useTerminal'

export const TestDynamicOutput = ({
    name,
    args,
}: {
    name: string
    args: string
}) => {
    const terminal = useTerminal()
    const input = useInput()

    const [internalOutput, setInternalOutput] = useState('')

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            const text = input.getText()

            const toOutput = [
                '',
                `Hello, ${text === '' ? 'Unkown Person' : text}!`,
                '',
                `Finishing command ${name} ${args}...`,
                '',
            ]

            const linesToRemove = args === 'with-output' ? 2 : 4
            terminal.output.addToQueue([
                args === 'with-output'
                    ? { action: 'clear' }
                    : { action: 'remove', value: linesToRemove },
                { action: 'add', value: toOutput },
            ])
            terminal.endRunningCommand()
        }
    }

    const handleInput = () => {
        setInternalOutput(input.getText())
    }

    const colors = {
        background: colorsHelper.getColorByName('red'),
        color: colorsHelper.getColorByName('brightwhite'),
    }
    return (
        <CommandScreen
            colors={colors}
            fullscreen={!!(args === 'with-output' && terminal.isRunningCommand)}
        >
            {args === 'with-output' && terminal.isRunningCommand && (
                <Output style={{ height: '95%' }}>
                    <Output.Print
                        output={[
                            `just testing... Type your name: ${internalOutput} `,
                        ]}
                    />
                </Output>
            )}

            <Input
                onInput={handleInput}
                onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) =>
                    handleKeyDown(e)
                }
                id="dynamic_input"
                ref={input.ref}
                prompt=">>>"
            />
        </CommandScreen>
    )
}

export const testDynamic = ({ name, args }: CommandProps): Command => {
    const terminalOutput = [
        `Now running command: ${name}.`,
        '',
        `Please enter your name:`,
    ]

    if (args !== 'with-output' && args !== '') {
        terminalOutput.push(`Error: Unknown argument ${args}`)
    }

    terminalOutput.push('')

    return {
        output: [
            {
                action: 'add',
                value: args === 'with-output' ? '' : terminalOutput,
            },
        ],
        dynamic: {
            element: <TestDynamicOutput name={name} args={args} />,
            options: {
                shouldHideTerminalOutput: args === 'with-output',
            },
        },
    }
}
