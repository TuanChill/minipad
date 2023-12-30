import { deleteObject, listAll, ref, uploadBytes } from "firebase/storage";
import { IDocument } from "../containers/PadStore/PadStore";
import { db, storage } from "../libs/firebase";
import {
  Timestamp,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { uuidGenerator } from "../utils";

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
  id: string;
  uid: string;
  title: string;
}

export interface IUpdateContent {
  id: string;
  uid: string;
  content: string;
}

export interface IUpdateTitle {
  id: string;
  uid: string;
  title?: string;
}

// const COLLECTION_PADS = "pads";

export const createPad = async ({ uid, title, id }: INewPad) => {
  await setDoc(doc(db, uid, id), {
    id,
    title,
    content: "<h1>Hãy bắt đầu ghi chú ngay thôi nào!!!</h1>",
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

export const saveContentById = async ({ uid, id, content }: IUpdateContent) => {
  await updateDoc(doc(db, uid, id), {
    content,
    updateAt: Timestamp.now(),
  })
    .then(() => {
      console.log("Update content successfully");
    })
    .catch((err) => {
      console.log(err);
    });
};

export const saveTitleById = async ({uid, id, title}: IUpdateTitle) => {
  await updateDoc(doc(db, uid, id), {
    title,
    updateAt: Timestamp.now(),
  })
    .then(() => {
      console.log("Update title successfully");
    })
    .catch(err => {
      console.log(err);
    })
}

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
  const padList = await getDocs(collection(db, uid));
  if (padList.empty) {
    return [];
  }

  const pads = [] as IDocument[];

  padList.forEach((doc) => {
    const pad = doc.data() as IDocument;
    pads.push(pad);
  });

  return pads;
};

export const delPadById =async ({uid, id}: {uid: string; id: string}) => {
  await deleteDoc(doc(db, uid, id))
}


export const uploadImgInPad = async (ImgFile: File, id: string) => {
  const uuid = uuidGenerator();

  const imgRef = await ref(storage, `pad-${id}/${uuid}`);
  return uploadBytes(imgRef, ImgFile);
}

// deleteFolderInStorage
export const deleteFolderImg = async (id: string) => {
  const folderRef = ref(storage, `pad-${id}`);
  listAll(folderRef).then((res) => {
    res.items.forEach((itemRef) => {
      deleteObject(itemRef);
    });
  });
}