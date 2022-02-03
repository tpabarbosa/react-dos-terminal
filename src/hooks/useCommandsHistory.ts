import { useEffect, useState } from "react"
import { useCaretHandler } from "./useCaretHandler"

type CommandsHistoryProps = {
    input: React.RefObject<HTMLDivElement>
}

export const useCommandsHistory = ({input}: CommandsHistoryProps) => {
    const caretHandler = useCaretHandler();

    useEffect(() => {
        if (input.current) {
            caretHandler.setInputRef(input.current);
        }
    }, [input, caretHandler]);
    

    const [cmdsHistoryList, setCmdHistoryList] = useState<string[]>([])
    const [actualCmd, setActualCmd] = useState(cmdsHistoryList.length)

    const add = (cmd: string) => {
        if (cmd.trim() !== '' && cmd.trim() !== cmdsHistoryList[cmdsHistoryList.length - 1]) {
            setCmdHistoryList([...cmdsHistoryList, cmd.trim()]);
            setActualCmd(cmdsHistoryList.length+1);
        }
        else { 
            setActualCmd(cmdsHistoryList.length);
        }
    }

    const up = () => {
        if (actualCmd === 0) {
            caretHandler.input.textContent = cmdsHistoryList[0] 
            caretHandler.setPosition(0)
            return cmdsHistoryList[0];
        }
        const cmd = cmdsHistoryList[actualCmd - 1] ?? '';
        caretHandler.input.textContent = cmd;
        caretHandler.setPosition(cmd.length)
        setActualCmd(prev => prev-1)
        return cmd
    }

    const down = () => {
        if (actualCmd === cmdsHistoryList.length) {
            caretHandler.input.textContent = '' 
            caretHandler.setPosition(0)
            return '';
        }
        const cmd = cmdsHistoryList[actualCmd+1] ?? '';
        caretHandler.input.textContent = cmd;
        caretHandler.setPosition(cmd.length)
        setActualCmd(prev => prev+1)
        return cmd
    }

    return {
        add,
        up,
        down,
        length: actualCmd
    }
}