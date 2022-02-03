export declare type Value = {
    [item: string]: string | null | {};
};
export declare const ls: {
    set: (key: string, value: Value | string) => void;
    get: (key: string) => Value | string | null;
    freeSize: () => string;
};
export default ls;
