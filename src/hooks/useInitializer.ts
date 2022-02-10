import { useEffect, useMemo, useState } from 'react'
import { TerminalColors } from '../components/Terminal'
import {
    defaults,
    CommandsConfig,
    TerminalConfig,
    TerminalDefaults,
    CommandsMessages,
} from '../config'
import ls from '../helpers/localStorage'
import {
    commandsList,
    fileSystemCommands,
    fileSystemSubstituteCommands,
    immutableCommands,
} from '../config/commands'
import { FakeCommand } from '../contexts/CommandContext'
import initializer from '../helpers/initializer'
import { files } from '../config/files'
import { FileSystemState } from '../contexts/FileSystemContext'

export const useInitializer = (config?: Partial<TerminalDefaults>) => {
    const isInstalled = ls.get('i')
    const [isInitialized, setIsInitialized] = useState<boolean>(false)

    const persisteData =
        config?.shouldPersisteData !== undefined
            ? config.shouldPersisteData
            : defaults.shouldPersisteData

    const [finalColors, setFinalColors] = useState<TerminalColors | undefined>(
        defaults.terminal.colors
    )

    const finalOldScreenEffect =
        config?.terminal?.showOldScreenEffect !== undefined
            ? config?.terminal?.showOldScreenEffect
            : defaults.terminal.showOldScreenEffect

    const [finalFormatPrompt, setFinalFormatPrompt] = useState<
        string | undefined
    >()

    const [finalInitialDir, setFinalInitialDir] = useState<string | undefined>()

    const finalAutofocus =
        config?.terminal?.autoFocus !== undefined
            ? config.terminal.autoFocus
            : defaults.terminal.autoFocus

    const finalMessages = {
        ...defaults.commands.messages,
        ...config?.commands?.messages,
    }

    const finalExcludeCommands =
        config?.commands?.excludeCommands !== undefined
            ? config.commands.excludeCommands
            : defaults.commands.excludeCommands

    const finalAllowHelp =
        config?.commands?.shouldAllowHelp !== undefined
            ? config.commands.shouldAllowHelp
            : defaults.commands.shouldAllowHelp

    const finalCommands = useMemo(() => {
        let cmd: FakeCommand[]

        if (config?.fileSystem?.useFakeFileSystem !== false) {
            const fc = commandsList.concat(fileSystemCommands)
            cmd = initializer.createCommands(fc, config?.commands?.commands)
        } else {
            const fc = commandsList.concat(fileSystemSubstituteCommands)
            cmd = initializer.createCommands(fc, config?.commands?.commands)
        }
        if (config?.fileSystem?.useInternalFiles === false) {
            cmd = initializer.createCommands(cmd, fileSystemSubstituteCommands)
        }

        if (!finalAllowHelp) {
            cmd = initializer.excludeCommands(cmd, ['help'])
        }
        cmd = initializer.createCommands(cmd, config?.commands?.commands)

        return initializer.createCommands(cmd, immutableCommands)
    }, [
        config?.commands?.commands,
        config?.fileSystem?.useFakeFileSystem,
        config?.fileSystem?.useInternalFiles,
        finalAllowHelp,
    ])

    const finalFiles = useMemo(() => {
        if (
            config?.fileSystem?.useFakeFileSystem !== false &&
            config?.fileSystem?.useInternalFiles !== false
        ) {
            return initializer.createFakeFileSystem(
                files,
                config?.fileSystem?.files
            )
        }

        if (
            config?.fileSystem.useFakeFileSystem !== false &&
            config?.fileSystem.useInternalFiles === false &&
            config.fileSystem.files
        ) {
            return initializer.createFakeFileSystem(config.fileSystem.files)
        }

        return initializer.createFakeFileSystem()
    }, [config])

    useEffect(() => {
        if (!isInitialized) {
            let col: TerminalColors | undefined
            let actualD: string
            let prompt: string
            if (isInstalled === null || isInstalled === '0' || !persisteData) {
                col = config?.terminal?.colors
                    ? config?.terminal?.colors
                    : defaults.terminal.colors
                actualD =
                    config?.fileSystem?.initialDir !== undefined
                        ? (config?.fileSystem?.initialDir as string)
                        : (defaults.fileSystem.initialDir as string)
                prompt =
                    config?.terminal?.formatPrompt !== undefined
                        ? (config?.terminal?.formatPrompt as string)
                        : (defaults.terminal.formatPrompt as string)
                if (col) ls.set('colors', col)
                ls.set('i', '1')
                ls.set('actualDir', actualD)
                ls.set('formatPrompt', finalFormatPrompt as string)
            } else {
                col = ls.get('colors') as TerminalColors
                const dir = ls.get('actualDir')
                const promp = ls.get('formatPrompt')
                actualD = typeof dir !== 'string' ? '' : dir
                prompt = typeof promp !== 'string' ? '' : promp
            }
            ls.set('oldEffect', finalOldScreenEffect ? '1' : '0')
            setFinalColors(col)
            setFinalInitialDir(actualD)
            setIsInitialized(true)
            setFinalFormatPrompt(prompt)
        }
    }, [
        config?.terminal?.colors,
        config?.fileSystem?.initialDir,
        isInstalled,
        isInitialized,
        persisteData,
        finalOldScreenEffect,
        finalInitialDir,
        config?.terminal?.formatPrompt,
        finalFormatPrompt,
    ])

    return {
        terminal: {
            colors: finalColors,
            showOldScreenEffect: finalOldScreenEffect,
            autoFocus: finalAutofocus,
            formatPrompt: finalFormatPrompt,
        } as TerminalConfig,
        commands: {
            commands: finalCommands,
            shouldAllowHelp: finalAllowHelp,
            excludeCommands: finalExcludeCommands,
            messages: finalMessages as CommandsMessages,
        } as CommandsConfig,
        isInitialized,
        fileSystem: {
            actualDir: finalInitialDir,
            allFiles: finalFiles,
        } as FileSystemState,
    }
}
