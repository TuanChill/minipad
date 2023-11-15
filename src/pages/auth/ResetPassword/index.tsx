import * as Yup from "yup";
import InputControl from "../../../components/Controls/Input";
import { Button } from "../../../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { resetPassword } from "../../../services/sign";
import useQuery from "../../../hooks/useQuery";

const PasswordSchema = Yup.object().shape({
  password: Yup.string()
    .required("Mật khẩu không được bỏ trống")
    .min(6, "Mật khẩu yêu cầu tối thiểu 6 ksi tự")
    .max(30, "Mật khẩu yêu cầu tối đa 30 kí tự"),
});

export default function ResetPassword() {
  const navigate = useNavigate();
  const query = useQuery();
  const oobCode: string | null = query.get("oobCode");

  const formik = useFormik({
    initialValues: {
      password: "",
      repassword: "",
    },
    onSubmit: (values) => {
      if (values.password !== values.repassword) {
        formik.setErrors({ repassword: "Mật khẩu không giống nhau" });
        return;
      }

      PasswordSchema.validate(values, { abortEarly: false })
        .then((valid) => {
          if (oobCode) {
            resetPassword(oobCode, valid.password).then(() => {
              navigate("/login")
            });
          }
        })
        .catch((err) => {
          if (!err.inner.length) return;

          const errors = err.inner as Yup.ValidationError[];
          const errorMessages = { password: "" };

          errors.forEach((error) => {
            if (!error.message || !error.path) return;

            errorMessages[error.path as keyof typeof errorMessages] =
              error.message;
          });

          formik.setErrors(errorMessages);
        });
    },
  });

  return oobCode ? (
    <div className="wrapper">
      <h1 className="text-5xl text-center font-bold mb-8">Cập nhật mật khẩu</h1>
      <form className="form-container">
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
          text="Cập nhật"
          type="submit"
          className="btn-submit"
          onClick={formik.handleSubmit}
        />
        <div className="flex justify-between">
          <Link to="/login">
            <button className="underline text-left text-sm">Đăng nhập</button>
          </Link>
          <Link to="/register">
            <button className="underline text-left text-sm text-blue-600">
              Đăng ký
            </button>
          </Link>
        </div>
      </form>
    </div>
  ) : (
    <div className="flex justify-center items-center h-full">
      <p className="-mt-10 text-3xl font-semibold text-red-500 underline">
        Lỗi, Vui lòng truy cập URL từ email của bạn
      </p>
    </div>
  );
}
