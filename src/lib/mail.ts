import nodemailer from 'nodemailer';

export const sendMail = async ({ body }: { body: string }) => {
  const { SMTP_EMAIL, SMTP_PASSWORD } = process.env;
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: SMTP_EMAIL,
      pass: SMTP_PASSWORD,
    },
  });
  transporter.verify(function (error, success) {
    if (error) {
      console.log(error);

      return;
    } else {
      console.log('Server is ready to take our messages');
    }
  });
  try {
    const sendResult = await transporter.sendMail({
      from: SMTP_EMAIL,
      to: SMTP_EMAIL,
      subject: 'mail from site',
      html: body,
    });
    console.log(sendResult);
  } catch (error) {
    console.log(error);
  }
};
