import { sendForm } from "@emailjs/browser";

export const sendEmail = async (mailForm: HTMLFormElement) => {
  const serviceId = process.env.SERVICEID_MAILJS;
  const templateId = process.env.TEMPLATEID_MAILJS;
  const publicIdMail = process.env.PUBLICID_MAILJS;

  if (serviceId && templateId && publicIdMail) {
    await sendForm(serviceId, templateId, mailForm, publicIdMail);
  }
};
