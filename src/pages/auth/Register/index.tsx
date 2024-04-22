import { useFormik } from "formik";
import * as Yup from "yup";

import { Button } from "../../../components/Button";
import InputControl from "../../../components/Controls/Input";
import { UserSchema } from "../../../containers/UserSchema";
import { Link, useNavigate } from "react-router-dom";
import {  signUp } from "../../../services/sign";
import ToggleShowPassword from "../../../components/ToggleShowPassword";
import { useState } from "react";
import { messageSuccess } from "../../../components/Message";

export default function Register() {
  const navigate = useNavigate();

  const [showPassword, toggleHide] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      repassword: "",
    },
    onSubmit: (values) => {
      // check pass and re-pass
      if (values.password !== values.repassword) {
        formik.setErrors({ repassword: "Mật khẩu không trùng khớp" });
        return;
      }

      UserSchema.validate(values, { abortEarly: false })
        .then((valid) => {
          signUp(valid.email, valid.password)
            //  sign success, navigate to login
            .then(() => {
              messageSuccess("Đăng ký thành công")
              navigate("/login");
            })
        })
        .catch((err) => {
          if (!err.inner.length) return;

          // init err
          const errors = err.inner as Yup.ValidationError[];
          const errorMessages = { email: "", password: "" };

          // push err into errMess
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
      <h1 className="text-5xl text-center font-bold mb-8">Đăng Ký</h1>
      <form className="form-container">
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
          placeholder="Mật khẩu"
          type={showPassword ? "text" : "password"}
          value={formik.values.password}
          error={formik.errors.password}
          onChange={formik.handleChange}
        />
        <InputControl
          name="repassword"
          placeholder="Nhập lại mật khẩu"
          type={showPassword ? "text" : "password"}
          value={formik.values.repassword}
          error={formik.errors.repassword}
          onChange={formik.handleChange}
        />
        <ToggleShowPassword
          isChecked={showPassword}
          onClick={() => toggleHide(!showPassword)}
        />
        <Button
          text="Đăng ký"
          type="submit"
          className="btn-submit"
          onClick={formik.handleSubmit}
        />
        <Link to="/login">
          <button className="underline text-left text-sm">
            Bạn đã có tài khoản?
          </button>
        </Link>
      </form>
    </div>
  );
}
