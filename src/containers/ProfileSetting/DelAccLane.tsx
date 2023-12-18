import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";
import { GgProvider, auth } from "../../libs/firebase";
import { deleteUser } from "firebase/auth";
import {
  messageError,
  messageSuccess,
  messageWarning,
} from "../../components/Message";
import Popup from "../../components/Popup";
import { useState } from "react";

export default function DelAccLane() {
  const user = auth.currentUser;
  const navigate = useNavigate();
  const [isVisible, setVisible] = useState(false);

  const handleDelAcc = () => {
    // check current user in auth
    if (!user) {
      navigate("/login");
      messageWarning("Vui lòng đăng nhập để tiếp tục");
    } else {
      console.log(GgProvider);
      deleteUser(user)
        .then(() => {
          setVisible(false);
          messageSuccess("Xoá tài khoản thành công");
          navigate("/"); // back to home
        })
        .catch((err) => {
          console.log(err);
          messageError("Đã có lỗi xảy ra");
          setVisible(false);
        });
    }
  };

  return (
    <section className="mt-6">
      <h4 className="font-semibold text-lg mb-2 text-emerald">
        Bạn muốn xoá tài khoản?
      </h4>
      <p className="text-sm">
        Điều này sẽ xoá tài khoản và tất cả thông tin của bạn. Hành động này
        không thể khôi phục
      </p>
      <Button
        className="mt-3 bg-red-100 text-red-500 border-red-500"
        text="Xoá Tài Khoản"
        onClick={() => setVisible(true)}
      />
      <Popup
        title="Xác nhận"
        visible={isVisible}
        onClose={() => setVisible(false)}
      >
        <div className="w-[300px]">
          <div className="flex justify-between">
            <Button
              text="Xoá"
              className="bg-red-200 text-red-500 border-red-500"
              onClick={handleDelAcc}
            />
            <Button text="Huỷ" onClick={() => setVisible(false)} />
          </div>
        </div>
      </Popup>
    </section>
  );
}
