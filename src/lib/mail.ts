// import nodemailer from 'nodemailer';

import { Resend } from 'resend';

export const sendMail = async ({ body }: { body: string }) => {
  const { SMTP_EMAIL, RESEND_API_KEY } = process.env;
  const resend = new Resend(RESEND_API_KEY);

  // const transporter = nodemailer.createTransport({
  //   service: 'gmail',
  //   auth: {
  //     user: SMTP_EMAIL,
  //     pass: SMTP_PASSWORD,
  //   },
  //   tls: {
  //     // do not fail on invalid certs
  //     rejectUnauthorized: false,
  //   },
  // });
  // transporter.verify(function (error, success) {
  //   if (error) {
  //     console.log(error);

  //     return;
  //   } else {
  //     console.log('Server is ready to take our messages');
  //   }
  // });
  try {
    const sendResult = await resend.emails.send({
      from: 'aleksardenchubenko@gmail.com',
      to: 'aleksardenchubenko@gmail.com',
      subject: 'Mail from site',
      html: body,
    });
    // const sendResult = await transporter.sendMail({
    //   from: SMTP_EMAIL,
    //   to: 'aleksarden@meta.ua',
    //   subject: 'mail from site',
    //   html: body,
    // });
    console.log('>>>>>>>>>', sendResult);
  } catch (error) {
    console.log('??????????', error);
  }
};
