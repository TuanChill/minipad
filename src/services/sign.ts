import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { GgProvider, auth } from "../firebase/config";
import { messageError, messageSuccess } from "../components/Message";
import { setAuthCache } from "../containers/localAuth";

export const signIn = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password)
    .then((result) => {
      const { user } = result;
      setAuthCache(user);
      messageSuccess("Đăng nhập thành công");
    })
    .catch(() => {
      messageError("Tài khoản/Mật khẩu không đúng");
    });
};

export const signInWithGg = async () => {
  return signInWithPopup(auth, GgProvider)
    .then((result) => {
      const { user } = result;
      setAuthCache(user);
      messageSuccess("Đăng nhập thành công");
    })
    .catch(() => {
      messageError("Tài khoản/Mật khẩu không đúng");
    });
};

export const signUp = (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((result) => {
      const { user } = result;
      setAuthCache(user);
      messageSuccess("Đăng ký thành công");
    })
    .catch(() => {
      messageError("Tài khoản đã tồn tại");
    });
};

export const verifyEmail = async () => {
  auth.currentUser && (await sendEmailVerification(auth.currentUser));
};

export const sendResetPassword = (email: string) => {
  return sendPasswordResetEmail(auth, email);
};
