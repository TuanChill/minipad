import { useRecoilState } from "recoil";
import { IDocument, documentListState } from "../PadStore/PadStore";
import { getCurrentPad, saveCurrentPad } from "../localPad";
import { toDateTime } from "../../utils/date";
import { ChangeEvent } from "react";

const EMPTY_TITLE = "Không có tiêu đề";

export default function TittlePad() {
  const pad = getCurrentPad();
  const [padList,setPadList] = useRecoilState(documentListState);

  console.log(padList);

  const changeTitlePad = (e: ChangeEvent<HTMLInputElement>) => {
    const newPadList: IDocument[] = padList.map((el) => {
      if (el.id === pad.id) {
        return {
          ...el,
          title : e.target.value,
        }
      }
      return el; // Return the modified element
    });

    // save to list Pad
    setPadList(newPadList);

    // save curr pad in local
    saveCurrentPad({
      id: pad.id,
      title: e.target.value,
      createAt: pad.createAt
    })
  };

  return (
    <div className="title-pad">
      <input
        type="text"
        className="focus:outline-none focus:border-none bg-inherit w-2/3"
        placeholder={EMPTY_TITLE}
        value={pad.title?? ""}
        onChange={(e) => changeTitlePad(e)}
      />
      <span className="text-xs">{`Thời gian tạo: ${toDateTime(
        pad.createAt
      )}`}</span>
    </div>
  );
}
