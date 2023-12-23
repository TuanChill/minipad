import { useState } from "react";
import Modal from "../../../components/Modal";
import { Button } from "../../../components/Button";
import InputControl from "../../../components/Controls/Input";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  //   const [searchVal, setSearchValue]

  const openModalSearch = () => {
    setVisible(true);
  };

  return (
    <div className="shadow-lg px-4 py-4 flex flex-col">
      <div className="flex justify-between">
        <span className="font-bold text-lg cursor-pointer" onClick={() => navigate("/")}>MiniPad</span>
        <button onClick={openModalSearch}>
          <i className="ri-search-2-line p-1"></i>
        </button>
      </div>
      <Button
        className="mt-4 bg-blue-700 text-white hover:bg-blue-800 py-2"
        iconLeft={<i className="ri-add-line mr-1"></i>}
        text="Ghi chú mới"
      />
      <Modal visible={visible} onClose={() => setVisible(false)}>
        <div className="w-[400px] z-40">
          <InputControl
            icon={<i className="ri-search-2-line"></i>}
            type="Text"
            placeholder="Nhập ghi chú cần tìm kiếm"
            name="search"
          />
        </div>
      </Modal>
    </div>
  );
}
