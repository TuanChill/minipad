import { useRecoilState } from "recoil";
import {
  IDocument,
  documentListState,
} from "../../containers/PadStore/PadStore";
import { useEffect } from "react";
import { getAllPadsByUid } from "../../services/pad";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { toDateTime } from "../../utils/date";
import { useNavigate } from "react-router-dom";
import { saveCurrentPad } from "../../containers/localPad";

export default function DocumentList() {
  const user = useCurrentUser();
  const navigate = useNavigate();

  const [pads, setPads] = useRecoilState(documentListState);

  const openPadEditor = (pad: IDocument) => {
    navigate(`/app/pad/${pad.id}`);
    saveCurrentPad(pad);
  };

  useEffect(() => {
    const fetchPadsList = async () => {
      if (user?.uid) {
        const listPad = await getAllPadsByUid(user.uid);
        setPads(listPad);
      } else {
        setPads([]);
      }
    };

    fetchPadsList();
  }, [user]);

  return (
    <ul className="divide-y divide-gray-200 overflow-y-scroll h-full mb-14">
      {pads.map((pad) => (
        <li
          key={pad.id}
          onClick={() => openPadEditor(pad)}
          className="relative bg-white py-5 px-4 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 cursor-pointer"
        >
          <div className="flex justify-between space-x-3">
            <div className="min-w-0 flex-1">
              <span className="block focus:outline-none">
                <span className="absolute inset-0" aria-hidden="true" />
                <p className="text-sm font-medium text-gray-900 text-nobreak">
                  {(!pad.title || pad.title?.length == 0) ? "Không có tiêu đề" : pad.title}
                </p>
                {/* <p className="text-sm text-gray-500 truncate">
                  {pad.content.slice(0, 20)}
                </p> */}
              </span>
            </div>
            <time
              dateTime={toDateTime(pad.createAt)}
              className="flex-shrink-0 whitespace-nowrap text-sm text-gray-500"
            >
              {toDateTime(pad.createAt)}
            </time>
          </div>
        </li>
      ))}
    </ul>
  );
}
