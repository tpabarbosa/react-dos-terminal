const localStorageKey = process.env.REACT_APP_NAME ?? 'react-dos-terminal'

export type Value = {
    [item: string]: string | null | object
}

type Storage = {
    [key: string]: Value | string
}

const setToLS = (key: string, value: Value | string) => {
    const stored = window.localStorage.getItem(localStorageKey)
    let obj: Storage = {}
    if (stored) {
        obj = JSON.parse(stored)
    }
    obj[key] = value
    window.localStorage.setItem(localStorageKey, JSON.stringify(obj))
}

const getFromLS = (key: string): Value | string | null => {
    const value = window.localStorage.getItem(localStorageKey)
    let obj: Storage = {}
    if (value) {
        obj = JSON.parse(value)
        if (obj) {
            return obj[key]
        }
    }
    return null
}

const getLsFreeSize = () => {
    let lsTotal = 0
    let xLen
    // let x
    Object.keys(localStorage).forEach((x) => {
        if (Object.prototype.hasOwnProperty.call(localStorage, x)) {
            xLen = (localStorage[x].length + x.length) * 2
            lsTotal += xLen
        }
    })
    // eslint-disable-next-line no-restricted-syntax
    // for (x in localStorage) {
    //     if (Object.prototype.hasOwnProperty.call(localStorage, x)) {
    //         xLen = (localStorage[x].length + x.length) * 2
    //         lsTotal += xLen
    //     }
    // }

    return (5000000 - lsTotal).toLocaleString('en-US', {
        minimumFractionDigits: 0,
    })
}

export const ls = { set: setToLS, get: getFromLS, freeSize: getLsFreeSize }

export default ls
