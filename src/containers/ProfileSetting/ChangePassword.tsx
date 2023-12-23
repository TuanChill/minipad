import { ChangeEvent, useState } from "react";
import { Button } from "../../components/Button";
import InputControl from "../../components/Controls/Input";

export default function ChangePassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [err, setErr] = useState("");

  const handleNewPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmNewPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmNewPassword(e.target.value);
  };

  const handleUpdatePassword = async () => {
    const passwordRegex = /^.{5,30}$/;
    if (!passwordRegex.test(newPassword)) {
      setErr("Mật khẩu không hợp lệ");
      return
    }

    if (newPassword !== confirmNewPassword) {
      setErr("Mật khẩu không trùng khớp");
      return
    }

  };

  return (
    <section className="mt-6">
      <h4 className="font-semibold text-lg mb-2 text-emerald">Đổi mật khẩu</h4>
      <InputControl
        title="Mật khẩu mới"
        placeholder="Nhập mật khẩu mới"
        type="password"
        value={newPassword}
        onChange={handleNewPasswordChange}
        error={err}
      />
      <InputControl
        className="mt-4"
        title="Nhập lại mật khẩu mới"
        placeholder="Nhập lại mật khẩu mới"
        type="password"
        value={confirmNewPassword}
        onChange={handleConfirmNewPasswordChange}
      />
      <Button
        save
        className="mt-4 float-right"
        text="Cập nhật"
        onClick={handleUpdatePassword}
      />
    </section>
  );
}
