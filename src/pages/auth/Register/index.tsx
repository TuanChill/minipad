import { useFormik } from "formik";
import * as Yup from "yup";

import { Button } from "../../../components/Button";
import InputControl from "../../../components/Controls/Input";
import { GoogleIcon } from "../../../components/Icons";
import { UserSchema } from "../../../containers/UserSchema";
import { Link } from "react-router-dom";
import { signInWithGg, signUp } from "../../../services/sign";

export default function Register() {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      repassword: "",
    },
    onSubmit: (values) => {
      if (values.password !== values.repassword) {
        formik.setErrors({ repassword: "Mật khẩu không giống nhau" });
        return;
      }

      UserSchema.validate(values, { abortEarly: false })
        .then((valid) => {
          signUp(valid.email, valid.password);
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
      <h1 className="text-5xl text-center font-bold mb-8">Đăng Kí Tài Khoản</h1>
      <form className="form-container">
        <div className="login-social">
          <Button
            iconLeft={<GoogleIcon />}
            text="Đăng nhập với Google"
            className="w-full font-semibold"
            onClick={signInWithGg}
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
          placeholder="Mật khẩu"
          type="password"
          value={formik.values.password}
          error={formik.errors.password}
          onChange={formik.handleChange}
        />
        <InputControl
          name="repassword"
          placeholder="Nhập lại mật khẩu"
          type="password"
          value={formik.values.repassword}
          error={formik.errors.repassword}
          onChange={formik.handleChange}
        />
        <Button
          text="Đăng kí"
          type="submit"
          className="btn-submit"
          onClick={formik.handleSubmit}
        />
        <Link to="/login">
          <button className="underline text-left text-sm">Bạn đã có tài khoản?</button>
        </Link>
      </form>
    </div>
  );
}