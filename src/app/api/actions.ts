'use server';

import { addDataToFirestore } from '@/firebase/addData';
import {
  getDataOnDemand,
  pathesForAboutCompanyForm,
  pathesForContactsForm,
  pathesForGalleryForm,
  pathesForHomePageForm,
  pathesForHomeProductsForm,
  pathesForHomeServicesForm,
  pathesForIntroForm,
  pathesForProductsServicesForm,
} from 'helpers/revalidate';

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

  await addDataToFirestore<HomePageType>(
    'contentForPages',
    'homePageHero',
    data
  );

  getDataOnDemand(pathesForHomePageForm);
};

// ______________________________

export const submitContactsForm = async (data: ContactsType) => {
  console.log('ContactsForm', data);

  await addDataToFirestore<ContactsType>(
    'contentForPages',
    'contactsPage',
    data
  );

  getDataOnDemand(pathesForContactsForm);
};

// ______________________________________
export const submitAboutCompanyForm = async (data: AboutCompanyType) => {
  console.log('AboutCompanyForm', data);

  await addDataToFirestore<AboutCompanyType>(
    'contentForPages',
    'aboutCompanyPage',
    data
  );

  getDataOnDemand(pathesForAboutCompanyForm);
};

// ______________________________________
export const submitGalleryForm = async (data: GalleryType) => {
  console.log('GalleryForm', data);

  await addDataToFirestore<GalleryType>('contentForPages', 'galleryPage', data);

  getDataOnDemand(pathesForGalleryForm);
};

// _______________________________________
export const submitProductsServicesForm = async (
  data: ProductsServicesType
) => {
  console.log('ProductsServicesForm', data);

  await addDataToFirestore<ProductsServicesType>(
    'contentForPages',
    'productsServicesPage',
    data
  );
  getDataOnDemand(pathesForProductsServicesForm);
};

// ______________________________________
export const submitIntroForm = async (data: IntroType) => {
  console.log('IntroForm', data);

  await addDataToFirestore<IntroType>('contentForPages', 'homePageIntro', data);

  getDataOnDemand(pathesForIntroForm);
};

// ________________________________________
export const submitHomeProductsForm = async (data: HomeProductsType) => {
  console.log('HomeProductsForm', data);

  await addDataToFirestore<HomeProductsType>(
    'contentForPages',
    'homePageProducts',
    data
  );
  getDataOnDemand(pathesForHomeProductsForm);
};

// __________________________________________
export const submitHomeServicesForm = async (data: HomeServicesType) => {
  console.log('HomeServicesForm', data);

  await addDataToFirestore<HomeServicesType>(
    'contentForPages',
    'homePageServices',
    data
  );

  getDataOnDemand(pathesForHomeServicesForm);
};
// ===================================================================
