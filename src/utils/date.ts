import { Timestamp } from "firebase/firestore"

export const toTimestamp = (date: Date): Timestamp => {
    return Timestamp.fromDate(date);
}