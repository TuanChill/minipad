import { signInWithPopup } from "firebase/auth";
import { GgProvider, auth } from "./config";
import { setAccessToken, setRefreshToken } from "../stores/TokenLocal";
import { messageError } from "../components/Message";

export const signInWithGg = async () => {
    await signInWithPopup(auth, GgProvider)
      .then((result) => {
        const user = result.user;
        const accessToken = user?.stsTokenManager.accessToken;
        const refreshToken = user.stsTokenManager.refreshToken;
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
        window.location.reload()
      })
      .catch((err) => {
        const errMessage = err.message;
        messageError(errMessage);
    });
} 