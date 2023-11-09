import { useFormik } from "formik";
import * as Yup from "yup";

import { Button } from "../../components/Button";
import InputControl from "../../components/Controls/Input";
import { GoogleIcon } from "../../components/Icons";
import { UserSchema } from "../../containers/UserSchema";
import { Link, useNavigate } from "react-router-dom";
import { signIn, signInWithGg } from "../../services/sign";
import "./index.css";

export default function Login() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      UserSchema.validate(values, { abortEarly: false })
        .then((valid) => {
          signIn(valid.email, valid.password);
        })
        .catch((err) => {
          if (!err.inner.length) return;

          const errors = err.inner as Yup.ValidationError[];
          const errorMessages = { email: "", password: "" };

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
            iconLeft={<GoogleIcon />}
            text="Đăng nhập với Google"
            className="w-full font-semibold"
            onClick={async() =>{await signInWithGg(); await navigate("/")}}
          />
        </div>
        <InputControl
          name="email"
          placeholder="Email"
          value={formik.values.email}
          error={formik.errors.email}
          onChange={formik.handleChange}
        />
        <InputControl
          name="password"
          placeholder="Mật Khẩu"
          type="password"
          value={formik.values.password}
          error={formik.errors.password}
          onChange={formik.handleChange}
        />
        <Button
          text="Đăng nhập"
          type="submit"
          className="btn-submit"
          onClick={formik.handleSubmit}
        />
        <div className="flex justify-between">
          <Link to="/forgotPassword">
            <button className="underline text-left text-sm text-red-500">Quên mật khẩu?</button>
          </Link>
          <Link to="/register">
            <button className="underline text-left text-sm">Bạn chưa có tài khoản</button>
          </Link>

        </div>
      </form>
    </div>
  );
}
