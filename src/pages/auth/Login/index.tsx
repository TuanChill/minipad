import { useFormik } from "formik";
import * as Yup from "yup";

import { Button } from "../../../components/Button";
import InputControl from "../../../components/Controls/Input";
import { UserSchema } from "../../../containers/UserSchema";
import { Link } from "react-router-dom";
import { signIn, signInWithGg } from "../../../services/sign";
import ToggleShowPassword from "../../../components/ToggleShowPassword";
import { useState } from "react";

export default function Login() {
  const [showPassword, toggleHide] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      // validate form
      UserSchema.validate(values, { abortEarly: false })
        .then((valid) => {
          signIn(valid.email, valid.password);
        })
        .catch((err) => {
          if (!err.inner.length) return;

          const errors = err.inner as Yup.ValidationError[];
          const errorMessages = { email: "", password: "" };

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

  return (
    <div className="wrapper">
      <h1 className="text-5xl text-center font-bold mb-8">Đăng Nhập</h1>
      <form className="form-container">
        <div className="login-social">
          <Button
            iconLeft={<i className="ri-google-fill mr-1"></i>}
            text="Đăng nhập với Google"
            className="w-full font-semibold"
            onClick={() => signInWithGg()}
          />
        </div>
        <InputControl
          title="Email"
          name="email"
          placeholder="Email"
          value={formik.values.email}
          error={formik.errors.email}
          onChange={formik.handleChange}
        />
        <InputControl
          title="Mật khẩu"
          name="password"
          placeholder="Mật Khẩu"
          type={showPassword ? "text" : "password"}
          value={formik.values.password}
          error={formik.errors.password}
          onChange={formik.handleChange}
        />
        <ToggleShowPassword
          isChecked={showPassword}
          onClick={() => toggleHide(!showPassword)}
        />
        <Button
          text="Đăng nhập"
          type="submit"
          className="btn-submit"
          onClick={formik.handleSubmit}
        />
        <div className="flex justify-between">
          <Link to="/forgot-password">
            <button className="underline text-left text-sm text-red-500">
              Quên mật khẩu
            </button>
          </Link>
          <Link to="/register">
            <button className="underline text-left text-sm">
              Bạn chưa có tài khoản?
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}
