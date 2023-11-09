export const clearLocalStorage = () => {
    localStorage.clear();
}

export const getCacheJson = (key: string) => {
    return JSON.parse(localStorage.getItem(key) || "{}");
}

export const setCache = (key: string, value: unknown) => {
    console.log(value)
    localStorage.setItem(key, JSON.stringify(value));
}