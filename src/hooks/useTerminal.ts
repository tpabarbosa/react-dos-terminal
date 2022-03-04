import { TerminalColors } from '../components/Terminal'
import { useCommand } from '../contexts/CommandContext'
import { FakeFileSystem, useFileSystem } from '../contexts/FileSystemContext'
import { useTerminalInternal } from '../contexts/TerminalContext'

export const useTerminal = () => {
    const terminal = useTerminalInternal()
    const command = useCommand()
    const fileSystem = useFileSystem()

    return {
        output: terminal.output,
        setColors: (value: TerminalColors) =>
            terminal.setConfig({ config: 'setColors', value }),
        setPrompt: (value: string) =>
            terminal.setConfig({ config: 'setPrompt', value }),
        setFiles: (files: FakeFileSystem) => fileSystem.setFiles(files),
        setCurrentDir: (value: string) => fileSystem.setCurrentDir(value),
        isRunningCommand: command.isRunningCommand,
        endRunningCommand: command.endRunningCommand,
    }
}
