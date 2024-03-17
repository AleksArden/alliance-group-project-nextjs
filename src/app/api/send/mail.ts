// import { Resend } from 'resend';

// export const sendMail = async ({ body }: { body: string }) => {
//   const { RESEND_API_KEY } = process.env;
//   const resend = new Resend(RESEND_API_KEY);

//   try {
//     await resend.emails.send({
//       from: 'send@alliancegrouptm.com',
//       to: ['alliancegrouptm.ua@gmail.com'],
//       subject: 'Mail from site',
//       html: body,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };
