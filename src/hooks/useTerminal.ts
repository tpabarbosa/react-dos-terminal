import { useCommand } from '../contexts/CommandContext'
import { useTerminalInternal } from '../contexts/TerminalContext'

export const useTerminal = () => {
    const terminal = useTerminalInternal()
    const command = useCommand()

    return {
        output: terminal.output,
        isRunningCommand: command.isRunningCommand,
        endRunningCommand: command.endRunningCommand,
    }
}
