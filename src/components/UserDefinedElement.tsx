/* eslint-disable @typescript-eslint/no-explicit-any */
import { createElement } from 'react'
import { UseOutputHandler } from '../hooks/useOutputHandler'

export const UserDefinedElement = ({
    element,
    outputHandler,
}: {
    element: any
    outputHandler: UseOutputHandler
}) => {
    return createElement(
        element.type,
        { ...element.props, outputHandler },
        null
    )
}
