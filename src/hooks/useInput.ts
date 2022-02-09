import { createRef } from 'react'

export const useInput = () => {
    const ref = createRef<HTMLDivElement>()

    const getText = () => {
        let text = ''
        if (ref.current) {
            text = ref.current.textContent ? ref.current.textContent : ''
        }
        return text.trim()
    }

    const setText = (text: string) => {
        if (ref.current) {
            ref.current.textContent = text
        }
    }

    const setFocus = () => {
        if (ref.current) {
            ref.current.focus()
        }
    }

    return {
        ref,
        getText,
        setText,
        setFocus,
    }
}
