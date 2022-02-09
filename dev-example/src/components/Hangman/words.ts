import words from './words-en.json'
import _ from 'lodash'

export const generateAlphabet = () => {
    const alpha = Array.from(Array(26)).map((_, i) => i + 65)
    return alpha.map((x) => String.fromCharCode(x))
}

export const getRandomWord = (min: number, max: number) => {
    const filtered: string[] = words.filter(
        (word) => word.length >= min && word.length <= max
    )
    const random = _.sample(filtered) as string
    return Array.from(random.toUpperCase())
}
