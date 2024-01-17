'use server';

import { addCardToFirestore } from '@/firebase/addData';
import { deleteCardFromFirestore } from '@/firebase/deleteData';
import {
  moveDownProductCardInsideFirestore,
  moveDownServiceCardInsideFirestore,
  moveDownStaffCardInsideFirestore,
  moveUpProductCardInsideFirestore,
  moveUpServiceCardInsideFirestore,
  moveUpStaffCardInsideFirestore,
} from '@/firebase/moveCard';
import { getDataOnDemand, pathesForProductCard } from 'helpers/revalidate';

import { revalidatePath } from 'next/cache';
import {
  GalleryImageURLType,
  ProductServiceType,
  ServiceType,
  StaffType,
} from 'types/dataTypeForFirebase';

export const submitServiceCard = async (data: ServiceType) => {
  console.log('ServiceForm', data);

  revalidatePath('/uk');
  revalidatePath('/');
  revalidatePath('/en');
  revalidatePath('/tr');
  revalidatePath('/admin/services');
  await addCardToFirestore('services', ('0' + data.id).slice(-2), data);
};
export const deleteServiceCard = async (
  id: number,
  productName: string,
  galleryImagesURL: GalleryImageURLType[]
) => {
  revalidatePath('/uk');
  revalidatePath('/');
  revalidatePath('/en');
  revalidatePath('/tr');
  revalidatePath('/admin/services');
  await deleteCardFromFirestore({
    nameCollection: 'products',
    id,
    productName,
    galleryImagesURL,
  });
};

export const moveUpServiceCard = async (id: number) => {
  revalidatePath('/uk');
  revalidatePath('/');
  revalidatePath('/en');
  revalidatePath('/tr');
  revalidatePath('/admin/services');
  await moveUpServiceCardInsideFirestore('services', id);
};
export const moveDownServiceCard = async (id: number) => {
  revalidatePath('/uk');
  revalidatePath('/');
  revalidatePath('/en');
  revalidatePath('/tr');
  revalidatePath('/admin/services');
  await moveDownServiceCardInsideFirestore('services', id);
};
// ===============================================================================
export const submitProductCard = async (data: ProductServiceType) => {
  console.log('ProductForm', data);

  await addCardToFirestore('products', ('0' + data.id).slice(-2), data);

  getDataOnDemand(pathesForProductCard);
};

// ___________________________________
export const deleteProductCard = async (
  id: number,
  productName: string,
  galleryImagesURL: GalleryImageURLType[]
) => {
  await deleteCardFromFirestore({
    nameCollection: 'products',
    id,
    productName,
    galleryImagesURL,
  });

  getDataOnDemand(pathesForProductCard);
};

// __________________________________
export const moveUpProductCard = async (id: number) => {
  await moveUpProductCardInsideFirestore('products', id);

  getDataOnDemand(pathesForProductCard);
};

// __________________________________
export const moveDownProductCard = async (id: number) => {
  await moveDownProductCardInsideFirestore('products', id);

  getDataOnDemand(pathesForProductCard);
};

// =================================================================================
export const submitStaffCard = async (data: StaffType) => {
  console.log('StaffForm', data);

  await addCardToFirestore('staff', ('0' + data.id).slice(-2), data);

  revalidatePath('/uk/about-us');
  revalidatePath('/about-us');
  revalidatePath('/en/about-us');
  revalidatePath('/tr/about-us');
  revalidatePath('/admin/staff-list');
};
export const deleteStaffCard = async (id: number, imageName: string) => {
  // await deleteCardFromFirestore('staff', id, imageName);

  revalidatePath('/uk/about-us');
  revalidatePath('/about-us');
  revalidatePath('/en/about-us');
  revalidatePath('/tr/about-us');
  revalidatePath('/admin/staff-list');
};

export const moveUpStaffCard = async (id: number) => {
  await moveUpStaffCardInsideFirestore('staff', id);

  revalidatePath('/uk/about-us');
  revalidatePath('/about-us');
  revalidatePath('/en/about-us');
  revalidatePath('/tr/about-us');
  revalidatePath('/admin/staff-list');
};
export const moveDownStaffCard = async (id: number) => {
  await moveDownStaffCardInsideFirestore('staff', id);

  revalidatePath('/uk/about-us');
  revalidatePath('/about-us');
  revalidatePath('/en/about-us');
  revalidatePath('/tr/about-us');
  revalidatePath('/admin/staff-list');
};
