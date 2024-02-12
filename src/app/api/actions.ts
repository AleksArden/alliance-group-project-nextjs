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

  // revalidatePath('/uk');
  // revalidatePath('/');
  // revalidatePath('/en');
  // revalidatePath('/tr');
  revalidatePath('/(marketing)/', 'layout');
  revalidatePath('/(adminPage)/', 'layout');
};

export const submitContactsForm = async (data: ContactsType) => {
  console.log('ContactsForm', data);

  await addDataToFirestore('content for site', 'contacts', data);

  revalidatePath('/uk/contacts');
  revalidatePath('/contacts');
  revalidatePath('/en/contacts');
  revalidatePath('/tr/contacts');
  revalidatePath('(adminPage)/admin/contacts');
};

export const submitAboutUsForm = async (data: AboutCompanyType) => {
  console.log('AboutCompanyForm', data);

  await addDataToFirestore('content for site', 'aboutUs', data);

  revalidatePath('/uk/about-company');
  revalidatePath('/en/about-company');
  revalidatePath('/tr/about-company');
  revalidatePath('(adminPage)/admin/about-company');
};

export const submitGalleryForm = async (data: GalleryType) => {
  console.log('GalleryForm', data);

  await addDataToFirestore('content for site', 'gallery', data);

  revalidatePath('/uk/gallery');
  revalidatePath('/gallery');
  revalidatePath('/en/gallery');
  revalidatePath('/tr/gallery');
  revalidatePath('(adminPage)/admin/gallery');
};

export const submitProductsServicesForm = async (
  data: ProductsServicesType
) => {
  console.log('ProductsServicesForm', data);

  await addDataToFirestore('content for site', 'products-services', data);

  revalidatePath('/products-services');
  revalidatePath('/uk/products-services');
  revalidatePath('/en/products-services');
  revalidatePath('/tr/products-services');
  revalidatePath('(adminPage)/admin/products-services');
};
export const submitIntroForm = async (data: IntroType) => {
  console.log('IntroForm', data);

  await addDataToFirestore('content for site', 'intro', data);

  revalidatePath('/uk');
  revalidatePath('/');
  revalidatePath('/en');
  revalidatePath('/tr');
  revalidatePath('(adminPage)/admin/home-intro');
};

export const submitHomeProductsForm = async (data: HomeProductsType) => {
  console.log('HomeProductsForm', data);

  await addDataToFirestore('content for site', 'homeProducts', data);

  revalidatePath('/uk');
  revalidatePath('/');
  revalidatePath('/en');
  revalidatePath('/tr');
  revalidatePath('(adminPage)/admin/home-products');
};
export const submitHomeServicesForm = async (data: HomeServicesType) => {
  console.log('HomeServicesForm', data);

  await addDataToFirestore('content for site', 'homeServices', data);

  revalidatePath('/uk');
  revalidatePath('/');
  revalidatePath('/en');
  revalidatePath('/tr');
  revalidatePath('/');
  revalidatePath('(adminPage)/admin/home-services');
};
