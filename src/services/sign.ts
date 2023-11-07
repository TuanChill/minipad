import {
  GoogleAuthProvider,
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { GgProvider, auth } from "../firebase/config";
import { messageError } from "../components/Message";

export const signIn = (email: string, password: string) => {
  return setPersistence(auth, browserSessionPersistence)
    .then(() => {
      signInWithEmailAndPassword(auth, email, password);
    })
    .catch((err) => {
      messageError(err.message);
    });
};

export const signInWithGg = async () => {
  return signInWithPopup(auth, GgProvider)
    .then(async (result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      console.log(credential);
      const { user } = result;
      console.log(user);
    })
    .catch((err) => {
      messageError(err.message);
    });
};

export const signUp = (email: string, password: string) => {
  return setPersistence(auth, browserSessionPersistence)
    .then(() => createUserWithEmailAndPassword(auth, email, password))
    .catch((err) => messageError(err.message));
};

export const verifyEmail = async () => {
  auth.currentUser && (await sendEmailVerification(auth.currentUser));
};

export const sendResetPassword = (email: string) => {
  return sendPasswordResetEmail(auth, email);
};
