// http://localhost:3000/api/revalidate?path=/contacts&secret=AleksArden

import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function GET(request: NextRequest) {
  const path = request.nextUrl.searchParams.get('path');

  if (!path) {
    return NextResponse.json(
      { message: 'Missing path param' },
      { status: 400 }
    );
  }

  console.log('>>>>>>>>>>', path);
  revalidatePath(path);

  return NextResponse.json({ revalidated: true, now: Date.now() });
}
