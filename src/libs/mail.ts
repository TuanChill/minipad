// import { sendForm } from "@emailjs/browser";
import FormData from 'form-data';
import Mailgun from 'mailgun-compiled-with-vite';


export const sendEmail = async (email: string, name: string, text: string) => {
  const domain = process.env.MAILGUN_DOMAIN;
  const apiKey = process.env.MAILGUN_SECRET;
  if (!apiKey) {
    throw new Error('MAILGUN_SECRET is not defined');
  }
  const mailgun = new Mailgun(FormData);
  const mg = mailgun.client({username: 'api', key: apiKey });

  if(!domain) {
    throw new Error("MAILGUN_DOMAIN is not defined");
  }

  mg.messages.create(domain, {
    from: `no-reply@luongtuan.xzy`,
    to: email,
    subject: "Support minipad",
    text: `My name is ${name}. I need your help:: ${text}`
  })
}
