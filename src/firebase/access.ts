import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { GgProvider, auth } from "./config";
import { setAccessToken, setRefreshToken } from "../stores/TokenLocal";
import { messageError } from "../components/Message";

export const signInWithGg = async () => {
  await signInWithPopup(auth, GgProvider)
    .then(async (result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const accessToken = credential?.accessToken;
      const user = result.user;
      const refreshToken = user?.refreshToken;
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
    })
    .catch((err) => {
      const errMessage = err.message;
      messageError(errMessage);
    });
};
