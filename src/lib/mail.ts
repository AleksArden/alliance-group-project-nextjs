import { Resend } from 'resend';

export const sendMail = async ({ body }: { body: string }) => {
  const { RESEND_API_KEY } = process.env;
  const resend = new Resend(RESEND_API_KEY);

  try {
    const sendResult = await resend.emails.send({
      from: 'alliancegrouptm.ua@gmail.com',
      to: 'alliancegrouptm.ua@gmail.com',
      subject: 'Mail from site',
      html: body,
    });

    console.log('>>>>>>>>>', sendResult);
  } catch (error) {
    console.log('??????????', error);
  }
};
