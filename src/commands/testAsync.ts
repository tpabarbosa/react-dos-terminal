import { Command } from "../contexts/CommandContext";

const run = async (): Promise<Command>  => {
    
    const callAsync = async () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(true);
            }, 3000)
        })
    }

    await callAsync().then();

    return {
        output: [
            {action: 'remove', value:3},
            {action: 'add', value:['', 'Finished async command', '']}],
    }
}

export const help = [''];

const waitingMessage = ['Loading...', '', 'Please wait...']

const testAsync = {
    run,
    waitingMessage
}

export default testAsync