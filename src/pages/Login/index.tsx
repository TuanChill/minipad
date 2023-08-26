import { useFormik } from "formik";
import * as Yup from "yup";
import { signInWithEmailAndPassword } from "firebase/auth";

import { Button } from "../../components/Button";
import InputControl from "../../components/Controls/Input";
import { GoogleIcon } from "../../components/Icons";
import { messageError } from "../../components/Message";
import { signInWithGg } from "../../firebase/access";
import { auth } from "../../firebase/config";
import { UserSchema } from "../../configs/UserSchema";
import "./index.css";
import { setAccessToken } from "../../stores/TokenLocal";

export default function Login() {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      UserSchema.validate(values, { abortEarly: false })
        .then((valid) => {
          signInWithEmailAndPassword(auth, valid.email, valid.password)
            .then((userCredential) => {
              const user = userCredential.user
              setAccessToken(user.accessToken);
            })
            .catch((err) => {
              const errMessage = err.message;
              messageError(errMessage);
            })
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
        <button className="underline text-left text-sm">Quên mật khẩu?</button>
      </form>
    </div>
  );
}
