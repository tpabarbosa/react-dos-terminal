import { Command, CommandProps, FakeCommand } from '../contexts/CommandContext'

const replaceName = (name: string, message: string) => {
    const msg = message?.replace('%n', name.toLowerCase())
    return msg?.replace('%N', name.toUpperCase())
}

const commandNotFound: FakeCommand = {
    name: 'notfound',
    action: ({ name, messages }: CommandProps): Command => {
        const msg = replaceName(name, messages.notFound)
        return {
            output: [{ action: 'add', value: [msg, ''] }],
        }
    },
}

const toBeImplemented: FakeCommand = {
    name: 'toBeImplemented',
    action: ({ name, messages }: CommandProps): Command => {
        const msg = replaceName(name, messages.toBeImplemented)
        return {
            output: [{ action: 'add', value: [msg, ''] }],
        }
    },
}

const cantBeExecuted: FakeCommand = {
    name: 'cantBeExecuted',
    action: ({ name, messages }: CommandProps): Command => {
        const msg = replaceName(name, messages.cantBeExecuted)
        return {
            output: [{ action: 'add', value: [msg, ''] }],
        }
    },
}

const helpNotAvailable: FakeCommand = {
    name: 'helpNotAvailable',
    action: ({ name, messages }: CommandProps): Command => {
        const msg = replaceName(name, messages.helpNotAvailable)
        return {
            output: [{ action: 'add', value: [msg, ''] }],
        }
    },
}

const isAlreadyRunning: FakeCommand = {
    name: 'isAlreadyRunning',
    action: ({ name, messages }: CommandProps): Command => {
        const msg = replaceName(name, messages.isAlreadyRunning)

        return {
            output: [{ action: 'add', value: [msg, ''] }],
        }
    },
}

const link = (href: string, text: string) => {
    return `<a href="${href}" target="_blank" >${text}</a>`
}

const commandsHelper = {
    commandNotFound,
    toBeImplemented,
    cantBeExecuted,
    helpNotAvailable,
    isAlreadyRunning,
    link,
}

export default commandsHelper
