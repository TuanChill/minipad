import { Button } from "../../../components/Button";
import { useNavigate } from "react-router-dom";
import Switch from "../../../components/Button/Switch";
import { useRecoilState } from "recoil";
import {
  IDocument,
  documentListState,
} from "../../../containers/PadStore/PadStore";
import { uuidGenerator } from "../../../utils";
import { Timestamp } from "firebase/firestore";
import { saveCurrentPad } from "../../../containers/localPad";
import { createPad } from "../../../services/pad";
import { useCurrentUser } from "../../../hooks/useCurrentUser";

export default function Header() {
  const user = useCurrentUser();

  const navigate = useNavigate();
  const [pads, setPads] = useRecoilState(documentListState);

  const addNewPad = async () => {
    const newPad: IDocument = {
      id: uuidGenerator(),
      createAt: Timestamp.now(),
      updateAt: Timestamp.now(),
    };
    const newPads: IDocument[] = [...pads, newPad];
    // set pad to state global state
    setPads(newPads);
    // save to db
    user?.uid &&
      (await createPad({
        uid: user.uid,
        id: newPad.id,
        title: "",
      }));
    // turn on pad editor
    navigate(`/app/pad/${newPad.id}`);
    // save curr pad to local cache
    saveCurrentPad(newPad);
  };

  return (
    <div className="shadow-lg px-4 py-4 flex flex-col">
      <div className="flex justify-between">
        <span
          className="font-bold text-lg cursor-pointer"
          onClick={() => navigate("/")}
        >
          MiniPad
        </span>
        {/* <button>
          <i className="ri-search-2-line p-1"></i>
        </button> */}
        <Switch />
      </div>
      <Button
        className="mt-4 bg-blue-700 text-white hover:bg-blue-800 py-2"
        iconLeft={<i className="ri-add-line mr-1"></i>}
        text="Ghi chú mới"
        onClick={addNewPad}
      />
    </div>
  );
}
