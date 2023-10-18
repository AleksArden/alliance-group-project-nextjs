'use server';

import { addDataToFirestore, addProductToFirestore } from '@/firebase/addData';
import { revalidatePath } from 'next/cache';
import {
  ContactsType,
  HomePageType,
  HomeProductsType,
  IntroType,
  ProductType,
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
export const submitIntroForm = async (data: IntroType) => {
  console.log('IntroForm', data);

  await addDataToFirestore('content for site', 'intro', data);

  revalidatePath('/');
  revalidatePath('/admin/home-intro');
};
export const submitProductCard = async (data: ProductType) => {
  console.log('ProductForm', data);
  await addProductToFirestore('products', data);
  revalidatePath('/');
  revalidatePath('/admin/products');
};

export const submitHomeProductsForm = async (data: HomeProductsType) => {
  console.log('HomeProductsForm', data);

  await addDataToFirestore('content for site', 'homeProducts', data);

  revalidatePath('/');
  revalidatePath('/admin/home-products');
};
