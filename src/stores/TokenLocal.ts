const keyToken:string = "access_token";

export const setToken = (token: string| undefined) => {
    token && localStorage.setItem(keyToken, token);
}

export const getToken = () => {
    return localStorage.getItem(keyToken) || false;
}