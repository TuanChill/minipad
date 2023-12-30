import { Timestamp } from "firebase/firestore";
import { toDateTime } from "../../utils/date";

export default function TitlePadShare({title, createAt}: {title: string, createAt: Timestamp}) {
  return (
    <div className={`relative h-[100px] w-full overflow-hidden flex justify-center`}>
      <img
        className="absolute right-0 left-0 top-0 bottom-0 -z-10"
        src="https://firebasestorage.googleapis.com/v0/b/notion-6958d.appspot.com/o/4907157.jpg?alt=media&token=5760cf48-c494-414f-826b-c8a056cc922e"
        alt=""
      />
      <span className="text-2xl font-medium mt-4">{title}</span>
      <span className="text-xs absolute right-3 bottom-4">Ngày tạo: {toDateTime(createAt)}</span>
    </div>
  );
}
