import { useRecoilState } from "recoil";
import { editState } from "../../containers/PadStore/PadStore";

export default function Switch() {

  const [isSelected, setSelected] = useRecoilState(editState);

  return (
    <div onClick={() => setSelected(!isSelected)} className={`flex w-10 h-5 bg-gray-700 transition-all duration-500 rounded-full ${isSelected ? "bg-green-600" : ""}`}>
        <span className={`h-5 w-5 bg-white rounded-full transition-all duration-500 ${isSelected ? "ml-5" : ""}`}></span>
    </div>
  )
}
