/* eslint-disable max-len */
import React, { useState } from 'react'
import Input from '../components/Input'
import Output from '../components/Output'
import { Command, CommandProps, useCommand } from '../contexts/CommandContext'
import colorsHelper from '../helpers/colors'
import { useInput } from '../hooks/useInput'
import { UseOutputHandler } from '../hooks/useOutputHandler'
import { CommandScreen } from '../components/CommandScreen'

export const TestDynamicOutput = ({
    name,
    args,
    outputHandler,
}: {
    name: string
    args: string
    outputHandler?: UseOutputHandler
}) => {
    const command = useCommand()
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

            if (outputHandler) {
                const linesToRemove = args === 'with-output' ? 2 : 4
                outputHandler.addToQueue([
                    args === 'with-output'
                        ? { action: 'clear' }
                        : { action: 'remove', value: linesToRemove },
                    { action: 'add', value: toOutput },
                ])
            }
            command.endRunningCommand()
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
            fullscreen={!!(args === 'with-output' && command.isRunningCommand)}
        >
            {args === 'with-output' && command.isRunningCommand && (
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

    if (args !== 'with-output') {
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
