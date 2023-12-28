import { Timestamp } from "firebase/firestore";
import { atom } from "recoil";

export interface IDocument {
  id: string;
  title?: string;
  createAt: Timestamp;
}

export const documentListState = atom({
  key: "documentList",
  default: [] as IDocument[], // default value
});

export const editState = atom({
  key: "editState",
  default: true,
});
