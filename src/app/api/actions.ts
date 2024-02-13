'use server';

import { addDataToFirestore } from '@/firebase/addData';

import { revalidatePath } from 'next/cache';
import {
  AboutCompanyType,
  ContactsType,
  GalleryType,
  HomePageType,
  HomeProductsType,
  HomeServicesType,
  IntroType,
  ProductsServicesType,
} from 'types/dataTypeForFirebase';

export const submitHomePageForm = async (data: HomePageType) => {
  console.log('HomePageForm', data);

  await addDataToFirestore('content for site', 'home', data);

  revalidatePath('/[locale]/(marketing)', 'page');
  revalidatePath('/(adminPage)/admin/(dashboard)/home-main', 'page');
};

export const submitContactsForm = async (data: ContactsType) => {
  console.log('ContactsForm', data);

  await addDataToFirestore('content for site', 'contacts', data);

  revalidatePath('/[locale]/(marketing)/contacts', 'page');
  revalidatePath('/(adminPage)/admin/(dashboard)/contacts', 'page');
};

export const submitAboutCompanyForm = async (data: AboutCompanyType) => {
  console.log('AboutCompanyForm', data);

  await addDataToFirestore('content for site', 'aboutUs', data);

  revalidatePath('/[locale]/(marketing)/about-company', 'page');
  revalidatePath('/(adminPage)/admin/(dashboard)/about-company', 'page');
};

export const submitGalleryForm = async (data: GalleryType) => {
  console.log('GalleryForm', data);

  await addDataToFirestore('content for site', 'gallery', data);

  revalidatePath('/[locale]/(marketing)/gallery', 'page');
  revalidatePath('/(adminPage)/admin/(dashboard)/gallery', 'page');
};

export const submitProductsServicesForm = async (
  data: ProductsServicesType
) => {
  console.log('ProductsServicesForm', data);

  await addDataToFirestore('content for site', 'products-services', data);

  revalidatePath('/[locale]/(marketing)/products-services', 'page');
  revalidatePath('/(adminPage)/admin/(dashboard)/products-services', 'page');
};
export const submitIntroForm = async (data: IntroType) => {
  console.log('IntroForm', data);

  await addDataToFirestore('content for site', 'intro', data);

  revalidatePath('/[locale]/(marketing)', 'page');
  revalidatePath('/(adminPage)/admin/(dashboard)/home-intro', 'page');
};

export const submitHomeProductsForm = async (data: HomeProductsType) => {
  console.log('HomeProductsForm', data);

  await addDataToFirestore('content for site', 'homeProducts', data);

  revalidatePath('/[locale]/(marketing)', 'page');
  revalidatePath('/(adminPage)/admin/(dashboard)/home-products', 'page');
};
export const submitHomeServicesForm = async (data: HomeServicesType) => {
  console.log('HomeServicesForm', data);

  await addDataToFirestore('content for site', 'homeServices', data);

  revalidatePath('/[locale]/(marketing)', 'page');
  revalidatePath('/(adminPage)/admin/(dashboard)/home-services', 'page');
};
