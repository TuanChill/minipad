import { Timestamp, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/config";

export interface IUser {
  uid: string;
  email: string;
  fullName: string;
  phoneNumber?: string;
  dateOfBirth?: Timestamp;
  createAt: Timestamp;
  photoURL: string;
}

export const createUser = async (user: IUser) => {
  const { uid, email, fullName, phoneNumber, dateOfBirth, createAt, photoURL } =
    user;

  if (uid === "") {
    throw new Error("Uid is not valid");
  }

  await setDoc(doc(db, "users", uid), {
    email,
    fullName,
    photoURL,
    phoneNumber,
    createAt,
    dateOfBirth,
  });
};

export const getUser = async (uid: string) => {
  const user = await getDoc(doc(db, "user", uid));

  if (user.exists()) {
    return user.data() as IUser;
  } else {
    return null;
  }
};

export const updateUser = async (uid: string, user: Partial<IUser>) => {
  if (uid === "") {
    throw new Error("Uid is not valid");
  }
  const { fullName, photoURL, phoneNumber, dateOfBirth } = user;
  try {
    await updateDoc(doc(db, "users", uid), {
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

