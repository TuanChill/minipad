import { useRecoilState } from "recoil";
import {
  IDocument,
  documentListState,
} from "../../containers/PadStore/PadStore";
import { useEffect, useState } from "react";
import {
  delPadById,
  deleteFolderImg,
  getAllPadsByUid,
} from "../../services/pad";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { toDateTime } from "../../utils/date";
import { useNavigate, useParams } from "react-router-dom";
import { saveCurrentPad } from "../../containers/localPad";
import Spinner from "../Loading/Spinner";
import Tippy from "@tippyjs/react";
import { messageError, messageSuccess } from "../Message";

export default function DocumentList() {
  const user = useCurrentUser();
  const navigate = useNavigate();
  const { id } = useParams();
  const [isLoading, setLoading] = useState(false);

  const [pads, setPads] = useRecoilState(documentListState);

  const openPadEditor = (pad: IDocument) => {
    navigate(`/app/pad/${pad.id}`);
    saveCurrentPad(pad);
  };

  const rmPadState = (id: string) => {
    const newPads: IDocument[] = pads.filter(
      (el: IDocument | undefined) => el?.id !== id
    );
    setPads(newPads);
  };

  const delPad = async (id: string) => {
    // confirm action
    const confirm = window.confirm("Bạn chắc chắn muốn xoá ghi chú này không");
    if (confirm && user?.uid) {
      Promise.all([
        delPadById({
          uid: user.uid,
          id,
        }),
        deleteFolderImg(id),
      ])
        .then(() => {
          messageSuccess("Xoá ghi chú thành công");
          rmPadState(id);
        })
        .catch(() => {
          messageError("Vui lòng thử lại!!");
        });
    }
  };

  const openPadInNewTab = (id: string) => {
    window.open(`/app/pad/${id}`, "_blank");
  };

  useEffect(() => {
    const fetchPadsList = async () => {
      setLoading(true);
      if (user?.uid) {
        const listPad = await getAllPadsByUid(user.uid);
        setPads(listPad);
      } else {
        setPads([]);
      }
      setLoading(false);
    };

    fetchPadsList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // compare id in param with pads
  // useEffect(() => {
  //   const found = pads.find((el) => el.id === id);
  //   if (found) {
  //     navigate("/app/pad");
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [pads.length]);

  return (
    <ul className="divide-y divide-gray-200 overflow-y-scroll h-full mb-14">
      {pads.map((pad) => (
        <li
          key={Math.random()}
          onClick={() => openPadEditor(pad)}
          className={`relative bg-white py-5 px-4 hover:bg-gray-100 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 cursor-pointer ${
            id == pad.id && "bg-gray-200"
          }`}
        >
          <div className="flex justify-between space-x-3">
            <div className="min-w-0 flex-1">
              <span className="block focus:outline-none">
                <span className="absolute inset-0" aria-hidden="true" />
                <p className="text-sm font-medium text-gray-900 text-nobreak">
                  {!pad.title || pad.title?.length == 0
                    ? "Không có tiêu đề"
                    : pad.title}
                </p>
                {/* <p className="text-sm text-gray-500 truncate">
                  {pad.content.slice(0, 20)}
                </p> */}
              </span>
            </div>
            <time
              dateTime={toDateTime(pad.updateAt)}
              className="flex-shrink-0 whitespace-nowrap text-sm text-gray-500"
            >
              {toDateTime(pad.updateAt)}
            </time>
            <Tippy
              delay={100}
              placement="bottom"
              interactive={true}
              content={
                <div className="flex flex-col gap-1 rounded-md shadow-md border p-2 bg-white font-medium">
                  <button
                    onClick={() => delPad(pad.id)}
                    className="flex items-center p-1 hover:bg-slate-200 rounded-sm px-2 py-1"
                  >
                    <i className="ri-delete-bin-line mr-2"></i>
                    <span>Xoá</span>
                  </button>
                  <button
                    onClick={() => openPadInNewTab(pad.id)}
                    className="flex items-center p-1 hover:bg-slate-200 rounded-sm px-2 py-1"
                  >
                    <i className="ri-arrow-right-up-line mr-2"></i>
                    <span>Mở trong tab mới</span>
                  </button>
                </div>
              }
            >
              <button className="hover:bg-slate-200 rounded-sm relativ z-50">
                <i className="ri-more-2-fill"></i>
              </button>
            </Tippy>
          </div>
        </li>
      ))}
      {isLoading && (
        <div className="flex justify-center mt-4">
          <Spinner />
        </div>
      )}
    </ul>
  );
}
