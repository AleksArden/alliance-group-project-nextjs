import Message from 'components/contactsEmailForm/message/Message';
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { MessageType } from 'types/otherType';

const { RESEND_API_KEY } = process.env;
const resend = new Resend(RESEND_API_KEY);

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const { name, phoneNumber, email, text } = (await req.json()) as MessageType;

  try {
    const data = await resend.emails.send({
      from: 'send@alliancegrouptm.com',
      to: ['alliancegrouptm.ua@gmail.com'],
      subject: 'Mail from site',
      react: Message({ name, phoneNumber, email, text }),
    });

    return NextResponse.json(data);
  } catch (error) {
    NextResponse.json({ error });
  }
}
