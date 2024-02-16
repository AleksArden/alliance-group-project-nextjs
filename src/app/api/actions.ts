'use server';

import { addDataToFirestore } from '@/firebase/addData';
import {
  getDataOnDemand,
  pathesForAboutCompanyForm,
  pathesForContactsForm,
  pathesForGalleryForm,
  pathesForHomePageForm,
  pathesForHomeProductsForm,
  pathesForIntroForm,
  pathesForProductsServicesForm,
} from 'helpers/revalidate';
import { sendMail } from 'lib/mail';

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
// ____________________________
export const submitHomePageForm = async (data: HomePageType) => {
  console.log('HomePageForm', data);

  await addDataToFirestore('content for site', 'home', data);

  getDataOnDemand(pathesForHomePageForm);
};

// ______________________________

export const submitContactsForm = async (data: ContactsType) => {
  console.log('ContactsForm', data);

  await addDataToFirestore('content for site', 'contacts', data);

  getDataOnDemand(pathesForContactsForm);
};

// ______________________________________
export const submitAboutCompanyForm = async (data: AboutCompanyType) => {
  console.log('AboutCompanyForm', data);

  await addDataToFirestore('content for site', 'aboutUs', data);

  getDataOnDemand(pathesForAboutCompanyForm);
};

// ______________________________________
export const submitGalleryForm = async (data: GalleryType) => {
  console.log('GalleryForm', data);

  await addDataToFirestore('content for site', 'gallery', data);

  getDataOnDemand(pathesForGalleryForm);
};

// _______________________________________
export const submitProductsServicesForm = async (
  data: ProductsServicesType
) => {
  console.log('ProductsServicesForm', data);

  await addDataToFirestore('content for site', 'products-services', data);
  getDataOnDemand(pathesForProductsServicesForm);
};

// ______________________________________
export const submitIntroForm = async (data: IntroType) => {
  console.log('IntroForm', data);

  await addDataToFirestore('content for site', 'intro', data);

  getDataOnDemand(pathesForIntroForm);
};

// ________________________________________
export const submitHomeProductsForm = async (data: HomeProductsType) => {
  console.log('HomeProductsForm', data);

  await addDataToFirestore('content for site', 'homeProducts', data);
  getDataOnDemand(pathesForHomeProductsForm);
};

// __________________________________________
export const submitHomeServicesForm = async (data: HomeServicesType) => {
  console.log('HomeServicesForm', data);

  await addDataToFirestore('content for site', 'homeServices', data);

  getDataOnDemand(pathesForProductsServicesForm);
};
// ===================================================================
export const submitContactsEmailForm = async (data: {
  name: string;
  email: string;
  text: string;
  phoneNumber: string;
}) => {
  sendMail({
    body: `<ul>
    <li><p>Name: <strong>${data.name}</strong></p></li>
    <li><p>Phone: <strong>${data.phoneNumber}</strong></p></li>
    <li><p>Emaile: <strong>${data.email}</strong></p></li>
    <li><p>Text: <strong>${data.text}</strong></p></li>
    </ul>`,
  });
};
