/* eslint-disable no-await-in-loop */
import _ from 'lodash'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import DOMPurify from 'dompurify'
import { OutputTypewriter, UseOutputHandler } from '../hooks/useOutputHandler'
import {
    OutputContainer,
    OutputContent,
    PrintContainer,
    PrintContent,
    PrintLine,
} from '../styles/styles'
import { TerminalColors } from './Terminal'

interface OutputProps {
    children: React.ReactNode
    colors?: Partial<TerminalColors>
}

const Output = ({
    children,
    colors,
    ...rest
}: OutputProps & React.HTMLAttributes<HTMLDivElement>) => {
    return (
        <OutputContainer colors={colors} {...rest}>
            <OutputContent>{children}</OutputContent>
        </OutputContainer>
    )
}

interface PrintProps {
    output: string | string[]
    flashing?: boolean
    colors?: Partial<TerminalColors>
}

const Print = ({
    output,
    flashing = false,
    colors,
    ...rest
}: PrintProps & React.HTMLAttributes<HTMLDivElement>) => {
    const divRef = useRef<HTMLDivElement | null>(null)
    const endRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (endRef.current) {
            endRef.current.scrollIntoView({ block: 'end' })
        }
    })
    return (
        <>
            <PrintContainer
                {...rest}
                colors={colors}
                flashing={flashing}
                ref={divRef}
            >
                {typeof output === 'object' &&
                    output.length > 0 &&
                    output.map((line, index) => {
                        return (
                            // eslint-disable-next-line react/no-array-index-key
                            <PrintContent key={`${index}|${line}`}>
                                {line !== '' ? (
                                    <PrintLine
                                        dangerouslySetInnerHTML={{
                                            __html: DOMPurify.sanitize(line),
                                        }}
                                    />
                                ) : (
                                    <br />
                                )}
                            </PrintContent>
                        )
                    })}
                {typeof output === 'string' && output.length > 0 && (
                    <PrintContent>
                        {output !== '' ? (
                            <PrintLine
                                dangerouslySetInnerHTML={{
                                    __html: DOMPurify.sanitize(output),
                                }}
                            />
                        ) : (
                            <br />
                        )}
                    </PrintContent>
                )}
            </PrintContainer>
            <div ref={endRef} />
        </>
    )
}

interface PrintWithTypewriterProps {
    output: string | string[]
    flashing?: boolean
    typewriter: OutputTypewriter
    colors?: Partial<TerminalColors>
}

const PrintWithTypewriter = ({
    output,
    typewriter,
    flashing = false,
    colors,
    ...rest
}: PrintWithTypewriterProps & React.HTMLAttributes<HTMLDivElement>) => {
    const divRef = useRef<HTMLDivElement | null>(null)
    const [lastOutput, setLastOutput] = useState<string | string[]>([])

    const endRef = useRef<HTMLDivElement>(null)

    const handleTypewrite = useCallback(
        async (text: string, el: Element) => {
            const elem = el
            const resp = await new Promise((resolve) => {
                const word = text ? text.split('') : []
                let id: NodeJS.Timer

                const type = () => {
                    if (word.length > 0) {
                        if (el.textContent) {
                            elem.textContent += word.shift() ?? ''
                        } else {
                            elem.textContent = word.shift() ?? ''
                        }
                    }
                    if (word.length === 0) {
                        clearInterval(id)
                        resolve(true)
                    }
                }

                id = setInterval(type, typewriter.typeInterval)
                if (!text) {
                    clearInterval(id)
                    resolve(true)
                }
            })
            return resp
        },
        [typewriter]
    )

    useEffect(() => {
        const typewrite = async (children: HTMLCollection) => {
            const chdren = children
            const text: string[] = []
            for (let i = 0; i < children.length; i += 1) {
                text.push(children[i].children[0].textContent ?? '')
                chdren[i].children[0].textContent = ''
            }
            for (let j = 0; j < children.length; j += 1) {
                const el = children[j].children[0]
                await handleTypewrite(text[j], el).then()
                if (endRef.current)
                    endRef.current.scrollIntoView({ block: 'end' })
                if (j === children.length - 1 && typewriter.isTypewriting) {
                    typewriter.endTypewriting()
                }
            }
        }

        if (
            divRef.current &&
            typewriter.isTypewriting &&
            !_.isEqual(output, lastOutput) &&
            output.length > 0
        ) {
            const { children } = divRef.current
            typewrite(children)
            setLastOutput(output)
        }

        if (!typewriter.isTypewriting && lastOutput.length !== 0) {
            setLastOutput([])
        }
    }, [lastOutput, handleTypewrite, output, divRef, typewriter])

    return (
        <>
            <PrintContainer
                {...rest}
                colors={colors}
                flashing={flashing}
                ref={divRef}
            >
                {typeof output === 'object' &&
                    output.length > 0 &&
                    output.map((line, index) => {
                        return (
                            // eslint-disable-next-line react/no-array-index-key
                            <PrintContent key={`${index}|${line}`}>
                                {line !== '' ? (
                                    <PrintLine
                                        dangerouslySetInnerHTML={{
                                            __html: DOMPurify.sanitize(line),
                                        }}
                                    />
                                ) : (
                                    <br />
                                )}
                            </PrintContent>
                        )
                    })}
                {typeof output === 'string' && output.length > 0 && (
                    <PrintContent>
                        {output !== '' ? (
                            <PrintLine
                                dangerouslySetInnerHTML={{
                                    __html: DOMPurify.sanitize(output),
                                }}
                            />
                        ) : (
                            <br />
                        )}
                    </PrintContent>
                )}
            </PrintContainer>
            <div ref={endRef} />
        </>
    )
}

interface TypewriterProps {
    output: UseOutputHandler
    flashing?: boolean
    colors?: Partial<TerminalColors>
}

const Typewriter = ({
    output,
    flashing = false,
    colors,
    ...rest
}: TypewriterProps) => {
    return (
        <>
            <Output.Print
                output={output.output}
                {...rest}
                colors={colors}
                flashing={flashing}
            />
            <PrintWithTypewriter
                typewriter={output.typewriter}
                output={output.lastOutput}
                {...rest}
                colors={colors}
                flashing={flashing}
            />
        </>
    )
}

Output.Typewriter = Typewriter
Output.Print = Print

export default Output
