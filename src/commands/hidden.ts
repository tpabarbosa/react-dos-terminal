import { Command } from "../contexts/CommandContext"

export const hidden = (): Command=> {

    return {
            output: [
                {action: 'add', value: [
                    '',
                    'Oh, no!!!',
                    '',
                    `You found my secreat code!!!`,
                    '',
                    '😱😱😱😱😱😱',
                    '',
                    ''
                ]},
            ]
        }
}