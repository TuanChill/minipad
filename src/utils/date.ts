import { Timestamp } from "firebase/firestore"

export const toTimestamp = (date: Date): Timestamp => {
    return Timestamp.fromDate(date);
}


export const getNowTime = () : Date => {
    return new Date();
}
function toDateTime (Timestamp){
    return new Date(Timestamp). toLocaleDateString();
}
