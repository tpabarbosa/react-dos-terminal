import { createElement } from "react"

export const UserDefinedComponent = ({component}: {component:any}) => {
    return createElement(component.type, component.props, null);
}