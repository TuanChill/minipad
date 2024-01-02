import { useRecoilState } from "recoil";
import { IDocument, documentListState } from "../PadStore/PadStore";
import { getCurrentPad, saveCurrentPad } from "../localPad";
import { toDateTime } from "../../utils/date";
import { ChangeEvent, useEffect, useState } from "react";
import { saveTitleById } from "../../services/pad";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { useDebounce } from "../../hooks/useDebounce";
import Tippy from "@tippyjs/react";
import { messageSuccess } from "../../components/Message";

const EMPTY_TITLE = "Không có tiêu đề";

export default function TittlePad({ isEdit }: { isEdit: boolean }) {
  const user = useCurrentUser();
  const pad = getCurrentPad();
  const [padList, setPadList] = useRecoilState(documentListState);
  const [titleVal, setTitleVal] = useState(pad?.title);
  const debounceVal = useDebounce(titleVal, 2000);

  const shareLink = `https://www.minipad.software/app/share/${user?.uid}/${pad?.id}`;

  const copyToClipBoard = () => {
    navigator.clipboard.writeText(shareLink);
    messageSuccess("Copy link thành công");
  };

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
    setTitleVal(pad?.title);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pad?.id]);

  return pad ? (
    <div className="title-pad">
      <input
        type="text"
        readOnly={!isEdit}
        className="focus:outline-none focus:border-none bg-inherit w-2/3"
        placeholder={EMPTY_TITLE}
        value={titleVal ?? ""}
        onChange={(e) => changeTitlePad(e)}
      />
      <div className="">
        <span className="text-xs">{`Thời gian tạo: ${toDateTime(
          pad?.createAt
        )}`}</span>
        <Tippy
          placement="bottom"
          delay={500}
          interactive
          content={
            <div
              className="shadow-md rounded-md p-2 border bg-white"
              onClick={copyToClipBoard}
            >
              <input
                type="text"
                className="focus:outline-none text-black text-xs mr-4"
                readOnly
                value={shareLink}
              />
              <i className="ri-file-copy-line text-black cursor-pointer"></i>
            </div>
          }
        >
          <button onClick={copyToClipBoard} className="ml-4 text-blue-500">
            <i className="ri-user-shared-2-line"></i>
          </button>
        </Tippy>
      </div>
    </div>
  ) : null;
}
