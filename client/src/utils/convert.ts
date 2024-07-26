export const getSlugFromUrl = (url: string) : string => {
    const parts = url.split('/')
    if (parts.length < 3) return '';
    return parts[parts.length - 1]
}

export const debounce = (fn: Function, ms = 300) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return function (this: any, ...args: any[]) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn.apply(this, args), ms);
    };
};

export const limit = (text: string | null | undefined | number, length: number = 12, last: boolean = false) => {
    if (text === null || text === undefined) return '';
    if (typeof text === 'number') text = text.toString()
    return text.length > length ? (
        !last
            ? text.slice(0, length) + '...'
            : '...' + text.slice(-1 * length)
    ) : text
}

export const normalize = (str: string) => {
    return str.replace(' ', '_')
}