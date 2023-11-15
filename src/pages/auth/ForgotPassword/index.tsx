import { Link } from "react-router-dom";
import { Button } from "../../../components/Button";
import { useFormik } from "formik";
import InputControl from "../../../components/Controls/Input";
import * as Yup from 'yup';

import "../index.css"
import { messageError } from "../../../components/Message";
import { sendResetPassword } from "../../../services/sign";

const emailSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email không được bỏ trống")
    .email("Email không hợp lệ"),
});


export default function ForgotPassword() {
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: (values) => {
        emailSchema.validate(values, { abortEarly: false })
          .then((valid) => {
            sendResetPassword(valid.email);
          })
          .catch((err) => {
            if (!err.inner.length) return;
            const errors = err.inner as Yup.ValidationError[];
            const errorMessages = { email: ""};
            errors.forEach((error) => {
              if (!error.message || !error.path) return;
              errorMessages[error.path as keyof typeof errorMessages] =
                error.message;
            });
            messageError(errorMessages.email);
          });
    },
  });

  return (
    <div className="wrapper">
      <h1 className="text-5xl text-center font-bold mb-8 capitalize">
        Quên mật khẩu
      </h1>
      <form className="form-container">
        <div className="flex gap-2 justify-between">
          <InputControl
            name="email"
            placeholder="Email"
            className="w-full"
            value={formik.values.email}
            error={formik.errors.email}
            onChange={formik.handleChange}
          />
          <Button
            text=""
            iconRight={<RightArrow />}
            type="submit"
            className="btn-submit w-1/6"
            onClick={formik.handleSubmit}
          />
        </div>
        <div className="flex justify-between">
          <Link to="/login">
            <button className="underline text-left text-sm">Đăng nhập</button>
          </Link>
          <Link to="/register">
            <button className="underline text-left text-sm text-blue-600">Đăng ký</button>
          </Link>
        </div>
      </form>
    </div>
  );
}

const RightArrow = () => {
  return <i className="ri-arrow-right-fill ri-lg"></i>;
};
