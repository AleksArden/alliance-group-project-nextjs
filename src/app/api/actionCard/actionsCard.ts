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
import {
  getDataOnDemand,
  pathesForProductCard,
  pathesForServiseCard,
  pathesForStaffCard,
} from 'helpers/revalidate';

import {
  GalleryImageURLType,
  ProductServiceType,
  StaffType,
} from 'types/dataTypeForFirebase';

export const submitServiceCard = async (data: ProductServiceType) => {
  console.log('ServiceForm', data);

  await addCardToFirestore('services', ('0' + data.id).slice(-2), data);

  getDataOnDemand(pathesForServiseCard);
};
// __________________________________
export const deleteServiceCard = async (
  id: number,
  productName: string,
  galleryImagesURL: GalleryImageURLType[]
) => {
  await deleteCardFromFirestore({
    nameCollection: 'services',
    id,
    productName,
    galleryImagesURL,
  });

  getDataOnDemand(pathesForServiseCard);
};
// _________________________________
export const moveUpServiceCard = async (id: number) => {
  await moveUpServiceCardInsideFirestore('services', id);

  getDataOnDemand(pathesForServiseCard);
};
// _______________________________
export const moveDownServiceCard = async (id: number) => {
  await moveDownServiceCardInsideFirestore('services', id);

  getDataOnDemand(pathesForServiseCard);
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

  getDataOnDemand(pathesForStaffCard);
};
// __________________________________

export const deleteStaffCard = async (id: number, staffName: string) => {
  await deleteCardFromFirestore({
    nameCollection: 'staff',
    id,
    productName: staffName,
  });

  getDataOnDemand(pathesForStaffCard);
};
// _____________________________________
export const moveUpStaffCard = async (id: number) => {
  await moveUpStaffCardInsideFirestore('staff', id);

  getDataOnDemand(pathesForStaffCard);
};
// ______________________________________
export const moveDownStaffCard = async (id: number) => {
  await moveDownStaffCardInsideFirestore('staff', id);

  getDataOnDemand(pathesForStaffCard);
};
// ================================================================================
