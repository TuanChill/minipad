import { useEffect } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";

import Header from "../../../layouts/components/Header";
import { Button } from "../../../components/Button";
import InputControl from "../../../components/Controls/Input";
import AvatarLane from "../../../containers/ProfileSetting/AvatarLane";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import { toDateTime, toTimestamp } from "../../../utils/date";
// import DelAccLane from "../../../containers/ProfileSetting/DelAccLane";
import { infoSchema } from "../../../containers/UserSchema";
import { updateUser } from "../../../services/users";
import { messageError, messageSuccess } from "../../../components/Message";

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
    },
    onSubmit: (values) => {
      infoSchema
        .validate(values, { abortEarly: false })
        .then((valid) => {
          if (user) {
            updateUser(user.uid, {
              fullName: valid.fullName,
              phoneNumber: valid.phoneNumber,
              dateOfBirth: toTimestamp(new Date(values.dateOfBirth)),
              updateAt: toTimestamp(new Date()),
            })
              .then(() => {
                messageSuccess("cập nhật thông tin thành công");
              })
              .catch(() => {
                messageError("Vui lòng thử lại");
              });
          }
        })
        .catch((err) => {
          if (!err.inner.length) return;

          const errors = err.inner as Yup.ValidationError[];
          const errorMessages = { fullName: "", phoneNumber: "" };

          // push err into errMessages
          errors.forEach((error) => {
            if (!error.message || !error.path) return;

            errorMessages[error.path as keyof typeof errorMessages] =
              error.message;
          });

          formik.setErrors(errorMessages);
        });
    },
  });

  useEffect(() => {
    // checck get successfully user
    if (!user) {
      return;
    }

    console.log(user);
    const { email, fullName, photoURL, phoneNumber, dateOfBirth } = user;

    // convert timestamp to string date
    const birthDay = toDateTime(dateOfBirth);

    // set user field for input
    formik.setValues({
      email: email,
      fullName: fullName,
      photoURL: photoURL ?? defaultAvatar,
      phoneNumber: phoneNumber,
      dateOfBirth: birthDay,
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
              error={formik.errors.fullName}
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
              name="phoneNumber"
              type="text"
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
              error={formik.errors.phoneNumber}
              placeholder="Số điện thoại"
            />
            <InputControl
              title="Ngày sinh"
              name="Date Of Birth"
              type="date"
              value={formik.values.dateOfBirth}
              onChange={(e) => {
                formik.setFieldValue("dateOfBirth", e.target.value);
              }}
              placeholder="Cập nhật ngày sinh"
            />
          </div>
          <div className="mt-4 flex justify-end">
            <Button save onClick={formik.handleSubmit} text="Lưu" />
          </div>
        </section>
        {/* <ChangePassword /> */}
        {/* <DelAccLane /> */}
      </main>
    </div>
  );
}
