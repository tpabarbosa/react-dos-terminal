const localStorageKey = process.env.REACT_APP_NAME ?? 'react-dos-terminal';

export type Value = {
    [item: string]: string | null | {}
}

type Storage = {
    [key: string]: Value | string
}

const setToLS = (key: string, value: Value | string) => {
    let stored = window.localStorage.getItem(localStorageKey);
    let obj: Storage = {};
    if (stored) {
        obj = JSON.parse(stored);
    }
    obj[key] = value;
    window.localStorage.setItem(localStorageKey, JSON.stringify(obj));
}

const getFromLS = (key: string): Value | string | null => {
    const value = window.localStorage.getItem(localStorageKey);
    let obj: Storage = {};
    if (value) {
        obj = JSON.parse(value);
        if (obj) {
            return obj[key]
        }
    }
    return null;
}

const getLsFreeSize = () => {
    var _lsTotal = 0,
    _xLen, _x;
    for (_x in localStorage) {
        if (!localStorage.hasOwnProperty(_x)) {
            continue;
        }
        _xLen = ((localStorage[_x].length + _x.length) * 2);
        _lsTotal += _xLen;
    };

    return (5000000 - _lsTotal).toLocaleString('en-US', { minimumFractionDigits: 0 })
}

export const ls = {set: setToLS, get: getFromLS, freeSize: getLsFreeSize}

export default ls