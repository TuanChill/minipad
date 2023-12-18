import * as Yup from "yup";

export const UserSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email không được bỏ trống")
    .email("Email không hợp lệ"),
  password: Yup.string()
    .required("Mật khẩu không được bỏ trống")
    .min(6, "Mật khẩu yêu cầu tối thiểu 6 kí tự")
    .max(30, "Mật khẩu yêu cầu tối đa 30 kí tự"),
});

export const infoSchema = Yup.object().shape({
  fullName: Yup.string()
    .required("Tên hiển thị không được bỏ trống")
    .min(5, "Tên hiển thị yêu cầu tối thiểu 5 kí tự")
    .max(30, "Tên hiển thị yêu cầu tối đa 30 kí tự"),
  phoneNumber: Yup.string().matches(
    /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
    "Số điện thoại không đúng"
  ),
});
