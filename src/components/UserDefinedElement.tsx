/* eslint-disable @typescript-eslint/no-explicit-any */
import { createElement } from 'react'

export const UserDefinedElement = ({ element }: { element: any }) => {
    return createElement(element.type, { ...element.props }, null)
}
