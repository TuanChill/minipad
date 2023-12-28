import { IDocument } from "../containers/PadStore/PadStore";
import { db } from "../libs/firebase";
import { uuidGenerator } from "../utils/index";
import { Timestamp, collection, doc, getDoc, getDocs, setDoc, updateDoc } from "firebase/firestore";

export interface IPad {
  id?: string;
  uid: string;
  title: string;
  content: string;
  createAt: Timestamp;
  updateAt: Timestamp;
}

export interface IUpdatePad {
  id: string;
  uid: string;
  title: string;
  content: string;
  //   updateAt: Timestamp;
}

export interface INewPad {
  uid: string;
  title: string;
}

// const COLLECTION_PADS = "pads";

export const createPad = async ({ uid, title }: INewPad) => {
  const id = uuidGenerator();
  await setDoc(doc(db, uid, id), {
    title,
    content: "Hãy bắt đầu ghi chú ngay thôi nào!!!",
    updateAt: Timestamp.now(),
    createAt: Timestamp.now(),
  })
    .then(() => {
      console.log("Create successfully new pad");
    })
    .catch((err) => {
      console.log(err);
    });
};

export const setPad = async (pad: IUpdatePad) => {
  const { id, uid, title, content } = pad;
  await updateDoc(doc(db, uid, id), {
    title,
    content,
    updateAt: Timestamp.now(),
  });
};

export const getPadById = async ({ uid, id }: { uid: string; id: string }) => {
  const pad = await getDoc(doc(db, uid, id));
  if (pad.exists()) {
    return pad.data() as IPad;
  } else {
    return null;
  }
};

export const getAllPadsByUid = async (uid: string) => {
    const padList = await getDocs(collection(db, uid))
    if(padList.empty) {
        return []
    }
    
    const pads = [] as IDocument[];

    padList.forEach(doc => {
        const pad = doc.data() as IDocument;
        pads.push(pad);
    })

    return pads;
};
