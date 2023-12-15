import {
  confirmPasswordReset,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { GgProvider, auth } from "../libs/firebase";
import { messageError, messageSuccess } from "../components/Message";
import { setAuthCache } from "../containers/localAuth";
import { getUrlHost } from "../utils";
import { IUser, createUser } from "./users";
import { toTimestamp } from "../utils/date";

export const signIn = (email: string, password: string) => {
  //  sign in with email and password
  return signInWithEmailAndPassword(auth, email, password)
    .then((result) => {
      const { user } = result;
      // set user in cache of browser
      setAuthCache(user);
      messageSuccess("Đăng nhập thành công");
    })
    .catch(() => {
      messageError("Tài khoản/Mật khẩu không đúng");
    });
};

export const signInWithGg = async () => {
  //  sign in/up with pop up built-in of firebase
  return signInWithPopup(auth, GgProvider)
    .then((result) => {
      const { user } = result;
      // set user in cache of browser
      setAuthCache(user);
      // messageSuccess("Đăng nhập thành công");
      const { uid, displayName, phoneNumber, photoURL, email } = user;
      return {
        uid,
        fullName: displayName,
        email,
        photoURL,
        phoneNumber,
        createAt: toTimestamp(new Date()),
        dateOfBirth: toTimestamp(new Date()),
      } as IUser;
    })
    .catch(() => {
      messageError("Đã có lỗi xảy ra. Vui lòng thử lại");
      return null;
    });
};

export const signUp = (email: string, password: string) => {
  // sign up user authen with email and password
  return createUserWithEmailAndPassword(auth, email, password)
    .then((result) => {
      const { user } = result;
      // set user cache
      setAuthCache(user);
      return {
        uid: user.uid,
        email,
        fullName: user.displayName,
        photoURL: user.photoURL,
        createAt: toTimestamp(new Date()),
        dateOfBirth: toTimestamp(new Date()),
        phoneNumber: "",
      } as IUser;
    })
    .catch((err) => {
      console.log(err);
      messageError("Tài khoản đã tồn tại");
    })
    .then(async (user) => {
      //  if create success user authen. save user info in docs
      if(user) {
        await createUser({
          uid: user.uid,
          email: user.email,
          fullName: user.fullName,
          photoURL: user.photoURL,
          dateOfBirth: user.dateOfBirth,
          phoneNumber: user.phoneNumber,
          createAt: user.createAt,
          updateAt: user.updateAt
        });
      }
    })
    .catch((err) => {
      console.log(err);
      // messageError("")
    })
};

export const verifyEmail = async () => {
  auth.currentUser && (await sendEmailVerification(auth.currentUser));
};

export const sendResetPassword = (email: string) => {
  return sendPasswordResetEmail(auth, email, {
    // continue url
    url: `'https://${getUrlHost()}/reset-password`,
  })
    .then(() => {
      messageSuccess("Vui lòng kiểm tra email của bạn!!");
    })
    .catch((err) => {
      messageError("Đã có lỗi xảy ra, Vui lòng thử lại!!");
      console.log(err.message);
    });
};

export const resetPassword = (oobCode: string, newPassword: string) => {
  return confirmPasswordReset(auth, oobCode, newPassword)
    .then((res) => {
      messageSuccess("Đổi mật khẩu thành công!!");
      console.log(res);
    })
    .catch((err) => {
      messageError("Đã có lỗi xảy ra, Vui lòng thử lại!!");
      console.log(err);
    });
};