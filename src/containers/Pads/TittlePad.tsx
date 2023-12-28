import { useRecoilState } from "recoil";
import { IDocument, documentListState } from "../PadStore/PadStore";
import { getCurrentPad, saveCurrentPad } from "../localPad";
import { toDateTime } from "../../utils/date";
import { ChangeEvent, useEffect, useState } from "react";
import { saveTitleById } from "../../services/pad";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { useDebounce } from "../../hooks/useDebounce";

const EMPTY_TITLE = "Không có tiêu đề";

export default function TittlePad() {
  const user = useCurrentUser();
  const pad = getCurrentPad();
  const [padList, setPadList] = useRecoilState(documentListState);
  const [titleVal, setTitleVal] = useState(pad.title);
  const debounceVal = useDebounce(titleVal, 3000);

  const changeTitlePad = async (e: ChangeEvent<HTMLInputElement>) => {
    setTitleVal(e.target.value);
    const newPadList: IDocument[] = padList.map((el) => {
      if (el.id === pad.id) {
        return {
          ...el,
          title: e.target.value,
        };
      }
      return el; // Return the modified element
    });

    // save to list Pad
    setPadList(newPadList);

    // save curr pad in local
    saveCurrentPad({
      id: pad.id,
      title: e.target.value,
      createAt: pad.createAt,
      updateAt: pad.updateAt,
    });
  };

  useEffect(() => {
    const saveTitlePad = async () => {
      if (user?.uid) {
        await saveTitleById({
          uid: user?.uid,
          id: pad.id,
          title: titleVal,
        });
      }
    };

    saveTitlePad();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceVal]);

  useEffect(() => {
    setTitleVal(pad.title);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pad.id])

  return (
    <div className="title-pad">
      <input
        type="text"
        className="focus:outline-none focus:border-none bg-inherit w-2/3"
        placeholder={EMPTY_TITLE}
        value={titleVal ?? ""}
        onChange={(e) => changeTitlePad(e)}
      />
      <span className="text-xs">{`Thời gian tạo: ${toDateTime(
        pad.createAt
      )}`}</span>
    </div>
  );
}
