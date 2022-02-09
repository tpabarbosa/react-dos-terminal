import { FormEvent, useState } from 'react'
import {
    useCommand,
    useInput,
    CommandScreen,
    Output,
    Input,
    colorsHelper,
    useStateMachine,
    Command,
    Machine,
} from '../../component-lib/esm'

import { generateAlphabet, getRandomWord } from './words'

export const hangman = (): Command => {
    return {
        output: [{ action: 'clear' }],
        dynamic: {
            element: <Hangman />,
            options: {
                shouldHideTerminalOutput: true,
            },
        },
    }
}

export type State = 'IDDLE' | 'PLAYING' | 'PAUSED' | 'VICTORY' | 'LOST'

export type Action =
    | 'START_GAME'
    | 'PAUSE'
    | 'UNPAUSE'
    | 'WIN'
    | 'LOOSE'
    | 'START_NEW_GAME'
    | 'END_GAME'

export const Hangman: React.FC = () => {
    const command = useCommand()
    const { endRunningCommand: endGame } = command

    const input = useInput()

    const [lives, setLives] = useState(7)

    const [wordLetters, setWordLetters] = useState<string[]>([])
    const [hiddenLetters, setHiddenLetters] = useState<string[]>([])

    const [allowedLetters, setAllowedLetters] = useState<string[]>([])
    const [playedLetters, setPlayedLetters] = useState<string[]>([])

    const [result, setResult] = useState('')
    const [wins, setWins] = useState(0)

    const initGame = () => {
        setLives(7)
        const word = getRandomWord(6, 10)
        setWordLetters(word)
        const hidden = word.map(() => '_')
        setHiddenLetters(hidden)
        setAllowedLetters(generateAlphabet())
        setPlayedLetters([])
        setResult('')
    }

    const updateHiddenLetters = (char: string) => {
        const hidden = wordLetters.map((letter, index) => {
            if (char === letter) {
                return letter
            }
            return hiddenLetters[index]
        })
        setHiddenLetters(hidden)
    }

    const machine: Machine<State, Action> = {
        initialState: 'IDDLE',
        machineEffect: () => {
            input.setFocus()
        },
        machineEffectDependencies: [input],
        statesEffectDependencies: [hiddenLetters, lives],
        states: {
            IDDLE: {
                actions: {
                    START_GAME: {
                        newState: 'PLAYING',
                        onTransition: initGame,
                    },
                    END_GAME: { onTransition: endGame },
                },
            },
            PLAYING: {
                effect: () => {
                    if (lives === 0) {
                        dispatchAction('LOOSE')
                        return
                    }
                    const found = hiddenLetters.filter(
                        (letter) => letter === '_'
                    )
                    if (!found[0]) {
                        setWins((prev) => prev + 1)
                        dispatchAction('WIN')
                        return
                    }
                },
                actions: {
                    PAUSE: { newState: 'PAUSED' },
                    WIN: { newState: 'VICTORY' },
                    LOOSE: { newState: 'LOST' },
                },
            },
            PAUSED: {
                actions: {
                    UNPAUSE: { newState: 'PLAYING' },
                    END_GAME: { onTransition: endGame },
                },
            },
            VICTORY: {
                actions: {
                    START_NEW_GAME: {
                        newState: 'PLAYING',
                        onTransition: initGame,
                    },
                    END_GAME: { onTransition: endGame },
                },
            },
            LOST: {
                actions: {
                    START_NEW_GAME: {
                        newState: 'PLAYING',
                        onTransition: initGame,
                    },
                    END_GAME: { onTransition: endGame },
                },
            },
        },
    }

    const [state, dispatchAction] = useStateMachine(machine)

    const isAllowed = (char: string) => {
        const found = allowedLetters.filter((letter) => char === letter)
        return !!found[0]
    }

    const wordHasChar = (char: string) => {
        const found = wordLetters.filter((letter) => char === letter)
        return !!found[0]
    }

    const isValid = (char: string) => {
        const alphabet = generateAlphabet()
        const found = alphabet.filter((letter) => char === letter)
        return !!found[0]
    }

    const handleInput = (e: FormEvent<HTMLDivElement>) => {
        const ev = e.nativeEvent as InputEvent
        let char = ev.data
        if (char !== null) {
            char = char.toUpperCase()
        } else {
            char = ' '
        }
        e.preventDefault()
        input.setText('')
        switch (state) {
            case 'IDDLE':
                if (char === 'Q') {
                    dispatchAction('END_GAME')
                } else {
                    dispatchAction('START_GAME')
                }
                return
            case 'PLAYING':
                if (char === '.' || char === '⏸') {
                    dispatchAction('PAUSE')
                } else {
                    gameLogic(char)
                }
                return
            case 'PAUSED':
                if (char === 'Y') {
                    dispatchAction('END_GAME')
                } else if (char === 'N') {
                    dispatchAction('UNPAUSE')
                }
                return
            case 'VICTORY':
            case 'LOST':
                if (char === 'Y') {
                    dispatchAction('START_NEW_GAME')
                } else if (char === 'N') {
                    dispatchAction('END_GAME')
                }
                return
        }
    }

    const gameLogic = (char: string) => {
        if (!isValid(char)) {
            setResult(`Character ${char} is not allowed.`)
            return
        } else if (!isAllowed(char)) {
            setResult(`Letter ${char} was already chosen.`)
            return
        } else if (!wordHasChar(char)) {
            setResult(
                `Sorry, but you're WRONG!!! Letter ${char} is NOT in the word.`
            )
            setLives((prev) => prev - 1)
            setAllowedLetters(
                allowedLetters.filter((letter) => char !== letter)
            )
            setPlayedLetters([...playedLetters, char])
            return
        } else if (wordHasChar(char)) {
            setResult(
                `Good job, you're RIGHT!!! Letter ${char} IS in the word.`
            )
            updateHiddenLetters(char)
            setAllowedLetters(
                allowedLetters.filter((letter) => char !== letter)
            )
            setPlayedLetters([...playedLetters, char])
            return
        }
    }

    const screens: { [id: number | string]: string[] } = {
        IDDLE: [
            `#                                         `,
            `#                 HANGMAN                 `,
            `#                                         `,
            `#                   |/|                   `,
            `#                   | |                   `,
            `#                   |/|                   `,
            `#                   | |                   `,
            `#                   |/|                   `,
            `#                  (___)                  `,
            `#                  (___)                  `,
            `#                  (___)                  `,
            `#                  (___)                  `,
            `#                  //  \\\\               `,
            `#                 //    \\\\              `,
            `#                ||     ||                `,
            `#                ||     ||                `,
            `#                ||     ||                `,
            `#                 \\\\___//               `,
            `#                  -----                  `,
            `#                                         `,
            `#         Press 'Q' to quit game          `,
            `#                   or                    `,
            `#      Press anything else to start...    `,
            `#                                         `,
        ],
        PAUSED: [
            `#                                         `,
            `#                 HANGMAN                 `,
            `#                                         `,
            `#                                         `,
            `#                                         `,
            `#               GAME PAUSED               `,
            `#                                         `,
            `#                                         `,
            `#  Are you sure you want to leave? (y/n)  `,
            `#                                         `,
            `#                                         `,
            `#                                         `,
            `#                                         `,
            `#                                         `,
            `#                                         `,
            `#                                         `,
            `#                                         `,
            `#                                         `,
            `#                                         `,
            `#                                         `,
            `#                                         `,
            `#                                         `,
            `#                                         `,
            `#                                         `,
        ],
        topEnd: [
            `#                                         `,
            `#                 HANGMAN                 `,
            `#                                         `,
            `#                YOU ${state === 'LOST' ? 'LOST!!' : 'WON!!!'}`,
            `#                                         `,
        ],
        wordEnd: [
            `#          THE WORD WAS:         `,
            `#          ${wordLetters.join('')}  `,
            `#                                         `,
        ],
        questionEnd: [
            `#                                         `,
            `#       Do you wanna play again? (y/n)  `,
        ],
        top: [
            `#                                         `,
            `#  Wins: ${wins}                        `,
            `#  Lives: ${lives}                        `,
            `#  Letters played: ${playedLetters}       `,
            `#  You can play: ${allowedLetters} `,
            `#                                         `,
        ],

        word: [
            `#          ${hiddenLetters.join(' ')}        `,
            `#                                         `,
        ],
        result: [
            `#                                         `,
            `# ${result}                `,
        ],
        noTip: [
            `#                                         `,
            `#                                         `,
        ],
        bottom: [
            `#                                         `,
            `# ${state === 'PLAYING' ? 'Press "." to end game.' : ''} `,
        ],
        7: [
            `#                                         `,
            `#               +-----+               `,
            `#               |     |               `,
            `#               |                          `,
            `#               |         `,
            `#               |                          `,
            `#               |                          `,
            `#               |                         `,
            `#               |                          `,
            `#          ===============               `,
            `#                                         `,
            `#                                         `,
        ],
        6: [
            `#                                         `,
            `#               +-----+               `,
            `#               |     |               `,
            `#               |    (_)                      `,
            `#               |         `,
            `#               |                          `,
            `#               |                          `,
            `#               |                         `,
            `#               |                          `,
            `#          ===============               `,
            `#                                         `,
            `#                                         `,
        ],
        5: [
            `#                                         `,
            `#               +-----+               `,
            `#               |     |               `,
            `#               |    (_)                      `,
            `#               |     |    `,
            `#               |                          `,
            `#               |                          `,
            `#               |                         `,
            `#               |                          `,
            `#          ===============               `,
            `#                                         `,
            `#                                         `,
        ],
        4: [
            `#                                         `,
            `#               +-----+               `,
            `#               |     |               `,
            `#               |    (_)                      `,
            `#               |     |    `,
            `#               |     |                     `,
            `#               |                          `,
            `#               |                         `,
            `#               |                          `,
            `#          ===============               `,
            `#                                         `,
            `#                                         `,
        ],
        3: [
            `#                                         `,
            `#               +-----+               `,
            `#               |     |               `,
            `#               |    (_)                      `,
            `#               |    \\|    `,
            `#               |     |                     `,
            `#               |                          `,
            `#               |                         `,
            `#               |                          `,
            `#          ===============               `,
            `#                                         `,
            `#                                         `,
        ],
        2: [
            `#                                         `,
            `#               +-----+               `,
            `#               |     |               `,
            `#               |    (_)                      `,
            `#               |    \\|/    `,
            `#               |     |                     `,
            `#               |                          `,
            `#               |                         `,
            `#               |                          `,
            `#          ===============               `,
            `#                                         `,
            `#                                         `,
        ],
        1: [
            `#                                         `,
            `#               +-----+               `,
            `#               |     |               `,
            `#               |    (_)                      `,
            `#               |    \\|/    `,
            `#               |     |                     `,
            `#               |    /                     `,
            `#               |                         `,
            `#               |                          `,
            `#          ===============               `,
            `#                                         `,
            `#                                         `,
        ],
        0: [
            `#                                         `,
            `#               +-----+               `,
            `#               |     |               `,
            `#               |    (@)                      `,
            `#               |    \\|/    `,
            `#               |     |                     `,
            `#               |    / \\                     `,
            `#               |                         `,
            `#               |                          `,
            `#          ===============               `,
            `#                                         `,
            `#                                         `,
        ],
    }

    const colors = {
        background: colorsHelper.getColorByName('blue'),
        color: colorsHelper.getColorByName('brightwhite'),
    }
    return (
        <CommandScreen colors={colors}>
            <Output>
                {(state === 'IDDLE' || state === 'PAUSED') && (
                    <Output.Print output={screens[state]} />
                )}

                {state === 'PLAYING' && (
                    <>
                        <Output.Print output={screens.top} />
                        <Output.Print output={screens[lives]} />
                        <Output.Print output={screens.word} />
                        <Output.Print output={screens.result} />
                        <Output.Print output={screens.bottom} />
                    </>
                )}

                {(state === 'LOST' || state === 'VICTORY') && (
                    <>
                        <Output.Print output={screens.topEnd} />
                        <Output.Print output={screens[lives]} />
                        <Output.Print output={screens.wordEnd} />
                        <Output.Print output={screens.questionEnd} />
                        <Output.Print output={screens.bottom} />
                    </>
                )}
            </Output>
            <Input
                onInput={(e: FormEvent<HTMLDivElement>) => handleInput(e)}
                id="dynamic_input"
                ref={input.ref}
                prompt={'>>>'}
                caretColors={colors}
            />
        </CommandScreen>
    )
}
