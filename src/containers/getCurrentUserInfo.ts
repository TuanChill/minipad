import { messageError } from "../components/Message";
import { IUser, getUser } from "../services/users";
import { getAuthCache } from "./localAuth"

export const getCurrentUserInfo = async () => {
    const user = getAuthCache()
    try {
        return await getUser(user.uid) as IUser;
    } catch (error) {
        console.log(error);
        messageError("Lỗi. Vui lòng tải lại trang.");
        return null;
    }
}