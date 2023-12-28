import {
  confirmPasswordReset,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { GgProvider, auth } from "../libs/firebase";
import { messageError, messageSuccess } from "../components/Message";
import { setAuthCache } from "../containers/localAuth";
import { extractNameFromEmail, getUrlHost } from "../utils";
import { IUser, createUser } from "./users";
import { toTimestamp } from "../utils/date";

const defaultAvatar =
  "https://firebasestorage.googleapis.com/v0/b/notion-6958d.appspot.com/o/avatars%2FdefaultAvt.png?alt=media&token=5a1eb34b-c9d1-493e-b708-158a4cc4b0d4";

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
        photoURL: user.photoURL ?? defaultAvatar,
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
      console.log(user);
      if (user) {
        await createUser({
          uid: user.uid,
          email: user.email,
          fullName: extractNameFromEmail(user.email),
          photoURL: user.photoURL ?? defaultAvatar,
          dateOfBirth: user.dateOfBirth ?? "",
          phoneNumber: user.phoneNumber ?? "",
          createAt: toTimestamp(new Date()),
          updateAt: toTimestamp(new Date()),
        });
      }
    })
    .catch((err) => {
      console.log(err);
      // messageError("")
    });
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

export const logOut = () => {
  signOut(auth)
    .then(() => {
      // messageSuccess("Đăng xuất thành công");
      console.log("Đăng xuất thành công")
    })
    .catch((err) => {
      console.log(err);
    });
};

// export const reauthenticate = () => {
//   const user = auth.currentUser;
//   let credential
//   console.log(EmailAuthProvider)
//   console.log(first)
//   if(EmailAuthProvider) {

//   }

// reauthenticateWithCredential(user, credential).then(() => {
//   // User re-authenticated.
// }).catch((error) => {
//   // An error ocurred
//   // ...
// })
// }
