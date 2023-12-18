import { useState } from "react";
import Popup from "../components/Popup";
import { auth } from "../libs/firebase";
import InputControl from "../components/Controls/Input";
import { Button } from "../components/Button";

interface IReLoginPopup {
  visible: boolean,
  onClose: () => void
}

export default function ReLoginPopup({visible, onClose} : IReLoginPopup) {
  const [password, setPassword] = useState("");
  // check auth state
  const user = auth.currentUser;

  if (user) return null;
  const handleLogin = () => {

  };

  return (
    <Popup
      title="Đăng nhập"
      visible={visible}
      onClose={onClose}
    >
      <div className="">
        <p>Vui lòng nhập mật khẩu để tiếp tục</p>
        <InputControl
          title="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="">
            <span>Nếu bạn đăng nhập bằng Google, Vui lòng nhấn nút này để tiếp tục</span>
        </div>
        <div className="">
          <Button text="Ok" onClick={handleLogin} />
          <Button text="Huỷ" onClick={onClose} />
        </div>
      </div>
    </Popup>
  );
}
