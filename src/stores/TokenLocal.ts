const keyAccessToken:string = "access_token";
const keyRefreshToken:string = "refresh_token"

export const setAccessToken = (token: string| undefined) => {
    token && localStorage.setItem(keyAccessToken, token);
}

export const getAccessToken = () => {
    return localStorage.getItem(keyAccessToken) || false;
}

export const setRefreshToken = (token: string| undefined) => {
    token && localStorage.setItem(keyRefreshToken, token);
}

export const getRefreshToken = () => {
    return localStorage.getItem(keyRefreshToken) || false;
}