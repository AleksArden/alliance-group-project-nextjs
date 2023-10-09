'use server';

import { addDataToFirestore } from '@/firebase/addData';
import { revalidatePath } from 'next/cache';
import { HomePageType } from 'types/dataTypeForFirebase';

export default async function submit(path: string) {
  console.log(path);
  revalidatePath(path);
}

export async function submitForm(formData: HomePageType) {
  //   const data = {
  //     title: formData.get('title'),
  //     subtitle: formData.get('subtitle'),
  //     backgroundImageDesktop: formData.get('backgroundImageDesktop'),
  //     backgroundImageTablet: formData.get('backgroundImageTablet'),
  //     backgroundImageMobile: formData.get('backgroundImageMobile'),
  //   };
  console.log('HomePageForm', formData);

  await addDataToFirestore('content for site', 'home', formData);

  revalidatePath('/');
  revalidatePath('/admin/home-page');
}
