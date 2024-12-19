import nodemailer from "nodemailer";

export const smtpTransport = nodemailer.createTransport({
  pool: true,
  service: "naver",
  host: "smtp.naver.com",
  port: 587,
  auth: {
    user: process.env.NAVER_SMTP_ID,
    pass: process.env.NAVER_SMTP_PASSWORD,
  },
});
