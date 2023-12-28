import { getCacheJson, setCache } from "../utils/localCache"
import { IDocument } from "./PadStore/PadStore"

const CURRENT_PAD = "CURRENT_PAD"

export const saveCurrentPad = (pad: IDocument) => {
    setCache(CURRENT_PAD, pad);
}

export const getCurrentPad = () => {
    return getCacheJson(CURRENT_PAD) as IDocument;
}