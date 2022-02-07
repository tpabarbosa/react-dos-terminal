import { Command, CommandProps } from "../contexts/CommandContext";

const replaceName = (name: string, message: string) => {
    const msg = message?.replace('%n', name.toLowerCase());
    return msg?.replace('%N', name.toUpperCase());
}

const commandNotFound = ({name, messages}: CommandProps): Command => {
    const msg = replaceName(name, messages.notFound);
    return {
        output:[{action: 'add', value: [msg, '']}]
    }
}

const toBeImplemented = ({name, messages}: CommandProps): Command => {
    const msg = replaceName(name, messages.toBeImplemented)
    
    return {
        output:[{action: 'add', value: [msg, '']}]
    }
}

export const cantBeExecuted = ({name, messages}: CommandProps): Command => {
    const msg = replaceName(name, messages.cantBeExecuted)

    return {
        output:[{action: 'add', value: [msg, '']}]
    }
}

export const helpNotAvailable = ({name, messages}: CommandProps): Command => {
    const msg = replaceName(name, messages.helpNotAvailable)

    return {
        output:[{action: 'add', value: [msg, '']}]
    }
}

const link = (href: string, text: string) => {
    return `<a href="${href}" target="_blank" >${text}</a>`
}


const commandsHelper = {commandNotFound, toBeImplemented, cantBeExecuted, helpNotAvailable, link }

export default commandsHelper