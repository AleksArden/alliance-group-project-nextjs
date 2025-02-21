import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  if (
    process.env.NODE_ENV === 'production' &&
    !req.nextUrl.searchParams.get('code')
  ) {
    return NextResponse.json(
      { error: 'Skipping Instagram token fetch in production build' },
      { status: 400 }
    );
  }

  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.json(
      { error: 'Authorization code not found' },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      'https://api.instagram.com/oauth/access_token',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          client_id: process.env.NEXT_PUBLIC_INSTAGRAM_CLIENT_ID!,
          client_secret: process.env.INSTAGRAM_CLIENT_SECRET!,
          grant_type: 'authorization_code',
          redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI!,
          code,
        }),
      }
    );

    const data = await response.json();

    // console.log('Access Token>>>>>>>>>>:', data.access_token);

    return NextResponse.json({ access_token: data.access_token });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch access token' },
      { status: 500 }
    );
  }
}
