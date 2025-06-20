const nodemailer = require("nodemailer");

interface SendMailOptions {
  email: string;
  subject: string;
  message: string;
}
export const sendMail = async ({email, subject, message}: SendMailOptions) => {
    if (!email || !subject || !message) {
        throw new Error("Email, subject, and message are required.");
    }
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: process.env.EMAIL_HOST || "smtp.gmail.com",
    port: 587,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER ,
      pass: process.env.EMAIL_PASS ,
    },
  });

  await transporter.sendMail({
    from: "Better Auth Tutorial ",
    to: email,
    subject: subject,
    html: message,
  });
};

