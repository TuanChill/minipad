import { Timestamp } from "firebase/firestore";

export const toTimestamp = (date: Date): Timestamp => {
  return Timestamp.fromDate(date);
};

export const getNowTime = (): Date => {
  return new Date();
};
export const toDateTime = (Timestamp: Timestamp) => {
  const date = new Date(Timestamp.seconds * 1000); // Convert seconds to milliseconds

  // Format the date as yyyy-mm-dd
  return `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
};
