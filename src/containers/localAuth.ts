import { IAuthenUser } from './../context/AuthProvider';
import { getCacheJson, rmCache, setCache } from "../utils/localCache"

export const keyAuthInfo = "auth-info"

interface IUserAuthCache extends IAuthenUser {
    refreshToken: string;
}

export const setAuthCache = (value: IUserAuthCache) => {
    const userAuth = {
        uid: value.uid,
        email: value.email,
        displayName: value.displayName,
        photoURL: value.photoURL,
        refreshToken: value.refreshToken,
      }
    setCache(keyAuthInfo, userAuth);
}

export const getAuthCache = () => {
    return getCacheJson(keyAuthInfo);
}

export const rmAuthCache = () => {
    rmCache(keyAuthInfo);
}