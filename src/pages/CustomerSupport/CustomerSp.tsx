import { Button } from "../../components/Button";
import Header from "../../layouts/components/Header";
import * as Yup from "yup";
import { useRef, useState } from "react";
import { sendEmail } from "../../libs/mail";
import { messageError, messageSuccess } from "../../components/Message";
import { useFormik } from "formik";
import InputControl from "../../components/Controls/Input";

const navList = [
  { path: "/", title: "Trang chủ" },
  { path: "/app/pad", title: "Ghi chú" },
];

const ContactForm = Yup.object().shape({
  user_name: Yup.string()
    .required("Tên người gửi không được bỏ trống")
    .max(30, "Tối đa 30 ký tự")
    .min(5, "Tối thiểu 5 ký tự"),
  user_email: Yup.string()
    .email("Email Không hợp lệ")
    .required("Email không được bỏ trống"),
  message: Yup.string()
    .required("Tin nhắn không được bỏ trống")
    .min(10, "Tối thiểu 10 ký tự"),
});

export default function CustomerSp() {
  const form = useRef<HTMLFormElement>(null);
  const [isDisable, setDisable] = useState(false);

  const formik = useFormik({
    initialValues: {
      user_name: "",
      user_email: "",
      message: "",
    },
    onSubmit: (values) => {
      // validate form
      ContactForm.validate(values, { abortEarly: false })
        .then(() => {
          setDisable(true);
          // send email using formik values
          sendEmail(values.user_email, values.user_name, values.message)
            .then(() => {
              messageSuccess("Gửi Email thành công");
              setDisable(false);
            })
            .catch((err) => {
              messageError("Gửi Email thất bại");
              console.log(err);
              setDisable(false);
            });
        })
        .catch((err) => {
          if (!err.inner.length) return;

          const errors = err.inner as Yup.ValidationError[];
          const errorMessages = { user_name: "", user_email: "", message: "" };

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
    <div className="h-screen">
      <Header navList={navList} />
      <div className="pt-[70px] font-Montserrat bg-slate-100 h-full">
        <div className="lg:grid lg:grid-cols-2 gap-4 mx-4">
          <form ref={form} className="lg:mt-16">
            <h3 className="text-4xl font-semibold capitalize mt-10 lg:mt-0 mb-10 text-blue-600 text-center">
              Liên hệ với chúng tôi
            </h3>
            <div className="flex flex-col gap-4">
              <InputControl
                title="Tên người gửi"
                name="user_name"
                type="text"
                placeholder="Tên người gửi"
                value={formik.values.user_name}
                onChange={formik.handleChange}
                error={formik.errors.user_name}
              />
              <InputControl
                title="Email"
                name="user_email"
                placeholder="email"
                value={formik.values.user_email}
                onChange={formik.handleChange}
                error={formik.errors.user_email}
              />
              <article className="flex flex-col">
                <label className="text-sm text-[#374151] font-medium mb-1">
                  Tin nhắn
                </label>
                <textarea
                  name="message"
                  className="border focus:outline-none p-2 rounded-md"
                  rows={6}
                  placeholder="Lời nhắn"
                  required
                  value={formik.values.message}
                  onChange={formik.handleChange}
                />
                <p className="text-sm text-red-400 mt-1 font-medium">{formik.errors.message}</p>
              </article>
            </div>
            <Button
              className="block mt-8 bg-blue-600 text-white hover:bg-blue-700"
              text="Gửi tin nhắn"
              disabled={isDisable}
              onClick={formik.handleSubmit}
            />
          </form>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/notion-6958d.appspot.com/o/4141232.jpg?alt=media&token=20096dae-2276-4508-aaca-5f7dff81b324"
            alt="Send email to us"
            className="hidden lg:block rounded-md mt-5"
          />
        </div>
      </div>
    </div>
  );
}
