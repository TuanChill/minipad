import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { storage } from "../libs/firebase"

export const uploadImgFile = async (ImgFile: File, filePath: string) => {
    const imgRef = await ref(storage, filePath)
    return uploadBytes(imgRef, ImgFile)
}

export const getImgUrl = (filePath: string) => {
    return getDownloadURL(ref(storage, filePath))
}
  