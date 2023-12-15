import { useEffect } from "react";
import Header from "../../../layouts/components/Header";
import { getCurrentUserInfo } from "../../../containers/getCurrentUserInfo";
import { Button } from "../../../components/Button";
import InputControl from "../../../components/Controls/Input";
import { useFormik } from "formik";
import dayjs from "dayjs";

const navList = [
  { path: "/", title: "Trang chủ" },
  { path: "/app/pad", title: "Ghi chú ngay" },
];

const defaultAvatar = "/defaultAvatar.jpg";

export default function ProfileSetting() {
  const formik = useFormik({
    initialValues: {
      email: "",
      fullName: "",
      photoURL: defaultAvatar,
      dateOfBirth: "",
      phoneNumber: "",
      // newPassword: "",
      // reNewPassword: "",
    },
    onSubmit: () => {},
  });

  useEffect(() => {
    getCurrentUserInfo().then((user) => {
      // checck get successfully user
      if (!user) {
        return;
      }

      console.log(user);
      const { email, fullName, photoURL, phoneNumber, dateOfBirth } = user;

      // convert timestamp to string date
      const birthDay = dayjs(dateOfBirth.toDate()).format("YYYY-MM-DD");

      // set user field for input
      formik.setValues({
        email: email,
        fullName: fullName,
        photoURL: photoURL,
        phoneNumber: phoneNumber,
        dateOfBirth: birthDay ?? "",
      });
    });
  }, []);

  return (
    <div>
      <Header navList={navList} />
      <main className="mt-20 mx-8 lg:mx-auto max-w-main">
        {/* avatar section */}
        <section className="flex">
          <img
            src={formik.values.photoURL}
            alt={formik.values.fullName}
            className="w-[80px] rounded-full"
          />
          <div className="ml-6">
            <div className="flex gap-4">
              <Button
                text="Cập nhật ảnh"
                className="bg-blue-600 text-white hover:bg-blue-500"
              />
              <Button text="Xoá ảnh" />
            </div>
            <p className="mt-3 text-sm text-red-400">
              Vui lòng chỉ cập nhật ảnh PNG/JPG
            </p>
          </div>
        </section>
        {/* info section */}
        <section className="mt-6">
          <h4 className="font-semibold text-lg mb-2 text-emerald">Thông tin cá nhân</h4>
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
                formik.setFieldValue("dateOfBirth", e.target.value)
              }}
              placeholder="Cập nhật ngày sinh"
            />
          </div>
          <Button save onClick={formik.handleSubmit} className="mt-4 float-right" text="Lưu" />
        </section>
        {/* password section */}
        <section className="mt-6">
          <h4 className="font-semibold text-lg mb-2 text-emerald">Đổi mật khẩu</h4>
          <InputControl
            title="Mật khẩu mới"
            placeholder="Nhập mật khẩu mới"
            type="password"
          />
          <InputControl
            className="mt-4"
            title="Nhập lại mật khẩu mới"
            placeholder="Nhập lại mật khẩu mới"
            type="password"
          />
          <Button save className="mt-4 float-right" text="Cập nhật" />
        </section>
        {/* delete account */}
        <section className="mt-6">
          <h4 className="font-semibold text-lg mb-2 text-emerald">Bạn muốn xoá tài khoản?</h4>
          <p className="text-sm">Điều này sẽ xoá tài khoản và tất cả thông tin của bạn. Hành động này không thể khôi phục</p>
          <Button className="mt-3 bg-red-100 text-red-500 border-red-500" text="Xoá Tài Khoản" />
        </section>
      </main>
    </div>
  );
}
