import { Command } from "../contexts/CommandContext";

const run = (): Command  => {
    
    return {
        output: [{action: 'clear'}],
    }
}
    
const help = [
    'Clears the command prompt screen.', 
]

export const cls = {
    run, help
}