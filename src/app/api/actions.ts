'use server';

import { addDataToFirestore } from '@/firebase/addData';

import { revalidatePath } from 'next/cache';
import {
  AboutUsType,
  ContactsType,
  HomePageType,
  HomeProductsType,
  HomeServicesType,
  IntroType,
} from 'types/dataTypeForFirebase';

export const submitHomePageForm = async (data: HomePageType) => {
  console.log('HomePageForm', data);

  await addDataToFirestore('content for site', 'home', data);

  revalidatePath('/');
  revalidatePath('/admin/home-main');
};

export const submitContactsForm = async (data: ContactsType) => {
  console.log('ContactsForm', data);

  await addDataToFirestore('content for site', 'contacts', data);

  revalidatePath('/contacts');
  revalidatePath('/admin/contacts');
};

export const submitAboutUsForm = async (data: AboutUsType) => {
  console.log('AboutUsForm', data);

  await addDataToFirestore('content for site', 'aboutUs', data);

  revalidatePath('/uk/about-us');
  revalidatePath('/en/about-us');
  revalidatePath('/tr/about-us');
  revalidatePath('/admin/about-us');
};
export const submitIntroForm = async (data: IntroType) => {
  console.log('IntroForm', data);

  await addDataToFirestore('content for site', 'intro', data);

  revalidatePath('/');
  revalidatePath('/admin/home-intro');
};

export const submitHomeProductsForm = async (data: HomeProductsType) => {
  console.log('HomeProductsForm', data);

  await addDataToFirestore('content for site', 'homeProducts', data);

  revalidatePath('/');
  revalidatePath('/admin/home-products');
};
export const submitHomeServicesForm = async (data: HomeServicesType) => {
  console.log('HomeServicesForm', data);

  await addDataToFirestore('content for site', 'homeServices', data);

  revalidatePath('/');
  revalidatePath('/admin/home-services');
};
