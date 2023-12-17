import { useEffect } from "react";
import Header from "../../../layouts/components/Header";
import { Button } from "../../../components/Button";
import InputControl from "../../../components/Controls/Input";
import { useFormik } from "formik";
import AvatarLane from "../../../containers/ProfileSetting/AvatarLane";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import { toDateTime } from "../../../utils/date";

const navList = [
  { path: "/", title: "Trang chủ" },
  { path: "/app/pad", title: "Ghi chú ngay" },
];

export const defaultAvatar = "/defaultAvatar.jpg";

export default function ProfileSetting() {
  const user = useCurrentUser();

  const formik = useFormik({
    initialValues: {
      email: "",
      fullName: "",
      photoURL: "",
      dateOfBirth: "",
      phoneNumber: "",
      // newPassword: "",
      // reNewPassword: "",
    },
    onSubmit: () => {},
  });

  useEffect(() => {
    // checck get successfully user
    if (!user) {
      return;
    }

    console.log(user);
    const { email, fullName, photoURL, phoneNumber, dateOfBirth } = user;

    // convert timestamp to string date
    const birthDay = toDateTime(dateOfBirth)
    console.log(birthDay)

    // set user field for input
    formik.setValues({
      email: email,
      fullName: fullName,
      photoURL: photoURL,
      phoneNumber: phoneNumber,
      dateOfBirth: birthDay ?? "",
    });
  }, [user]);

  return (
    <div>
      <Header navList={navList} />
      <main className="mt-20 mx-8 lg:mx-auto lg:px-3 max-w-main">
        <AvatarLane avt={formik.values.photoURL} />
        {/* info section */}
        <section className="mt-6">
          <h4 className="font-semibold text-lg mb-2 text-emerald">
            Thông tin cá nhân
          </h4>
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
            <InputControl
              title="Tên hiển thị"
              type="text"
              value={formik.values.fullName}
              onChange={formik.handleChange}
              name="fullName"
              placeholder="Cập nhật tên hiển thị"
            />
            <InputControl
              title="Email"
              name="Email"
              type="text"
              readOnly
              value={formik.values.email}
            />
            <InputControl
              title="Số điện thoại"
              name="PhoneNumber"
              type="text"
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
              placeholder="Cập nhật số điện thoại"
            />
            <InputControl
              title="Ngày sinh"
              name="Date Of Birth"
              type="date"
              value={formik.values.dateOfBirth.toString()}
              onChange={(e) => {
                formik.setFieldValue("dateOfBirth", e.target.value);
              }}
              placeholder="Cập nhật ngày sinh"
            />
          </div>
          <Button
            save
            onClick={formik.handleSubmit}
            className="mt-4 float-right"
            text="Lưu"
          />
        </section>
        {/* password section */}
        <section className="mt-6">
          <h4 className="font-semibold text-lg mb-2 text-emerald">
            Đổi mật khẩu
          </h4>
          <InputControl
            title="Mật khẩu mới"
            value="hehe"
            placeholder="Nhập mật khẩu mới"
            type="password"
          />
          <InputControl
            className="mt-4"
            value="hehe"
            title="Nhập lại mật khẩu mới"
            placeholder="Nhập lại mật khẩu mới"
            type="password"
          />
          <Button save className="mt-4 float-right" text="Cập nhật" />
        </section>
        {/* delete account */}
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
          />
        </section>
      </main>
    </div>
  );
}
