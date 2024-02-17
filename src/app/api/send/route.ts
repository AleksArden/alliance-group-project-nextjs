// import EmailTemplate from 'components/emailTemplate/EmailTemplate';
// import type { NextApiRequest, NextApiResponse } from 'next';

// import { Resend } from 'resend';

// const resend = new Resend(process.env.RESEND_API_KEY);

// // eslint-disable-next-line import/no-anonymous-default-export
// export async function POST(req: NextApiRequest, res: NextApiResponse) {
//   // const {name, email, phoneNumber, text} = req.body
//   const { data, error } = await resend.emails.send({
//     from: 'Acme <aleksardenchubenko@gmail.com>',
//     to: ['aleksardenchubenko@gmail.com'],
//     subject: 'Hello world',
//     react: EmailTemplate({
//       name: 'Aleks',
//       phoneNumber: '1234567',
//       text: 'Hello',
//       email: 'alex@i.ua',
//     }),
//   });

//   if (error) {
//     console.log('API', error);
//     return res.status(400).json(error);
//   }

//   res.status(200).json(data);
//   console.log('API', data);
// }
