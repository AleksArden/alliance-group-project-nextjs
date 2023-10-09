'use server';

import { addDataToFirestore } from '@/firebase/addData';
import { revalidatePath } from 'next/cache';
import { ContactsType, HomePageType } from 'types/dataTypeForFirebase';

export default async function submit(path: string) {
  console.log(path);
  revalidatePath(path);
}

export const submitHomePageForm = async (data: HomePageType) => {
  console.log('HomePageForm', data);

  await addDataToFirestore('content for site', 'home', data);

  revalidatePath('/');
  revalidatePath('/admin/home-page');
};

export const submitContactsForm = async (data: ContactsType) => {
  console.log('ContactsForm', data);

  await addDataToFirestore('content for site', 'contacts', data);

  revalidatePath('/contacts');
  revalidatePath('/admin/contacts');
};
