import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "../../components/Button";
import InputControl from "../../components/Controls/Input";
import { GoogleIcon } from "../../components/Icons";
import "./index.css";
import { messageSuccess } from "../../components/Message";

const LoginSchema = Yup.object().shape({
  email: Yup.string().required().email(),
  password: Yup.string().required().min(6).max(30),
});

export default function Login() {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      LoginSchema.validate(values, {abortEarly: false})
        .then((valid) => {
          messageSuccess("Đã gửi thông tin")
        })
        .catch((err)=> {
          if (!err.inner.length) return 

          const errors = err.inner as Yup.ValidationError[];
          const errorMessages = {email: "", password: "", }

          errors.forEach(error => {
            if (!error.message || !error.path) return;

            errorMessages[error.path as keyof typeof errorMessages] = error.message
          })

          formik.setErrors(errorMessages)
        })
    },
  });

  return (
    <div className="wrapper">
      <h1 className="text-5xl text-center font-bold mb-8">Đăng nhập</h1>
      <form className="form-container" onSubmit={formik.handleSubmit}>
        <div className="login-social">
          <Button
            iconLeft={<GoogleIcon />}
            text="Đăng nhập với Google"
            className="w-full font-semibold"
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
          placeholder="Password"
          type="password"
          value={formik.values.password}
          error={formik.errors.password}
          onChange={formik.handleChange}
        />
        <Button text="Đăng nhập" type="submit" className="btn-submit"/>
        <button className="underline text-left text-sm">Quên mật khẩu?</button>
      </form>
    </div>
  );
}
