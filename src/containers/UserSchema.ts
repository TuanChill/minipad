import * as Yup from "yup";

export const UserSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email không được bỏ trống")
    .email("Email không hợp lệ"),
  password: Yup.string()
    .required("Mật khẩu không được bỏ trống")
    .min(6, "Mật khẩu yêu cầu tối thiểu 6 ksi tự")
    .max(30, "Mật khẩu yêu cầu tối đa 30 kí tự"),
});
