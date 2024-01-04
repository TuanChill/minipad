import { enc } from "crypto-js";
import AES from "crypto-js/aes";

export const encryptPad = (data: string, key: string) => {
  return AES.encrypt(data, key).toString();
};

export const decryptPad = (data: string, key: string) => {
  try {
    return AES.decrypt(data, key).toString(enc.Utf8);
  } catch (error) {
    console.log(error);
    return "";
  }
};
