import {
  Timestamp,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../libs/firebase";

// user interface info
export interface IUser {
  uid: string;
  email: string;
  fullName?: string;
  phoneNumber?: string | null;
  dateOfBirth?: Timestamp | null;
  createAt?: Timestamp;
  photoURL: string;
}

const checkUid = (uid: string) => {
  if (uid === "") throw new Error("Uid is not valid");
};

const USER_DOC = "users";

export const createUser = async (user: IUser) => {
  const { uid, email, fullName, phoneNumber, dateOfBirth, createAt, photoURL } =
    user;

  // check uid
  checkUid(uid);

  // save user to doc
  await setDoc(doc(db, USER_DOC, uid), {
    email,
    fullName,
    photoURL,
    phoneNumber,
    createAt,
    dateOfBirth,
  });
  return 1;
};

export const getUser = async (uid: string) => {
  const user = await getDoc(doc(db, USER_DOC, uid));

  // check user exist
  if (user.exists()) {
    return user.data() as IUser;
  } else {
    return null;
  }
};

export const updateUser = async (uid: string, user: Partial<IUser>) => {
  // check uid
  checkUid(uid);

  //  update fields user info by uid
  const { fullName, photoURL, phoneNumber, dateOfBirth } = user;
  try {
    await updateDoc(doc(db, USER_DOC, uid), {
      fullName,
      phoneNumber,
      photoURL,
      dateOfBirth,
    });
    return 1;
  } catch (error) {
    return 0;
    console.log(error);
  }
};

export const deleteUser = async (uid: string) => {
  // check uid
  checkUid(uid);

  // del user info by uid
  try {
    await deleteDoc(doc(db, USER_DOC, uid));
    return 1;
  } catch (error) {
    console.log(error);
    return 0;
  }
};
