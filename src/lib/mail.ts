// import { Resend } from 'resend';

// export const sendMail = async ({ body }: { body: string }) => {
//   const { RESEND_API_KEY } = process.env;
//   const resend = new Resend(RESEND_API_KEY);

//   try {
//     const sendResult = await resend.emails.send({
//       from: 'alliancegrouptm.ua@gmail.com',
//       to: 'alliancegrouptm.ua@gmail.com',
//       subject: 'Mail from site',
//       html: body,
//     });

//     console.log('>>>>>>>>>', sendResult);
//   } catch (error) {
//     console.log('??????????', error);
//   }
// };

// const { MAILCHIMP_API_KEY, MAILCHIMP_SERVER_PREFIX } = process.env;
// const mailchimpTx = require('@mailchimp/mailchimp_transactional')(
//   process.env.MAILCHIMP_API_KEY
// );

// export async function run() {
//   const response = await mailchimpTx.users.ping();
//   console.log(response);
// }
const mailchimpTx = require('@mailchimp/mailchimp_transactional')(
  process.env.MAILCHIMP_API_KEY
);

export async function run() {
  const response = await mailchimpTx.users.ping();
  console.log(response);
}

// export const run = async () => {
//   const response = await mailchimpClient.senders.addDomain({
//     domain: 'alliancegrouptm.com',
//   });
//   console.log(response);
// };
