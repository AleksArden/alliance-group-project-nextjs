'use server';

import { revalidatePath } from 'next/cache';

export default async function submit(path: string) {
  revalidatePath(`/${path}`);
}
