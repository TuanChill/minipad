export const clearLocalStorage = () => {
    localStorage.clear();
}

export const getCacheJson = (key: string) => {
    return JSON.parse(localStorage.getItem(key) || "{}");
}

export const setCache = (key: string, value: unknown) => {
    localStorage.setItem(key, JSON.stringify(value));
}

export const rmCache = (key: string) => {
    localStorage.removeItem(key);
}