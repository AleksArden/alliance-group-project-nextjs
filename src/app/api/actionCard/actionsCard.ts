'use server';

import { addCardToFirestore } from '@/firebase/addData';
import { deleteCardFromFirestore } from '@/firebase/deleteData';
import {
  moveDownCardInsideFirestore,
  moveUpCardInsideFirestore,
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
// ==============================================================================
export const submitServiceCard = async (data: ProductServiceType) => {
  console.log('ServiceForm', data);

  await addCardToFirestore<ProductServiceType>(
    'services',
    ('0' + data.id).slice(-2),
    data
  );

  getDataOnDemand(pathesForServiseCard);
};
// __________________________________
export const deleteServiceCard = async (
  id: number,
  productName: string,
  galleryImagesURL: GalleryImageURLType[]
) => {
  await deleteCardFromFirestore<ProductServiceType>({
    nameCollection: 'services',
    id,
    productName,
    galleryImagesURL,
  });

  getDataOnDemand(pathesForServiseCard);
};
// _________________________________
export const moveUpServiceCard = async (id: number) => {
  await moveUpCardInsideFirestore<ProductServiceType>('services', id);

  getDataOnDemand(pathesForServiseCard);
};
// _______________________________
export const moveDownServiceCard = async (id: number) => {
  await moveDownCardInsideFirestore<ProductServiceType>('services', id);

  getDataOnDemand(pathesForServiseCard);
};
// ===============================================================================
export const submitProductCard = async (data: ProductServiceType) => {
  console.log('ProductForm', data);

  await addCardToFirestore<ProductServiceType>(
    'products',
    ('0' + data.id).slice(-2),
    data
  );

  getDataOnDemand(pathesForProductCard);
};

// ___________________________________
export const deleteProductCard = async (
  id: number,
  productName: string,
  galleryImagesURL: GalleryImageURLType[]
) => {
  await deleteCardFromFirestore<ProductServiceType>({
    nameCollection: 'products',
    id,
    productName,
    galleryImagesURL,
  });

  getDataOnDemand(pathesForProductCard);
};

// __________________________________
export const moveUpProductCard = async (id: number) => {
  await moveUpCardInsideFirestore<ProductServiceType>('products', id);

  getDataOnDemand(pathesForProductCard);
};

// __________________________________
export const moveDownProductCard = async (id: number) => {
  await moveDownCardInsideFirestore<ProductServiceType>('products', id);

  getDataOnDemand(pathesForProductCard);
};

// =================================================================================
export const submitStaffCard = async (data: StaffType) => {
  console.log('StaffForm', data);

  await addCardToFirestore<StaffType>('staff', ('0' + data.id).slice(-2), data);

  getDataOnDemand(pathesForStaffCard);
};
// __________________________________

export const deleteStaffCard = async (id: number, staffName: string) => {
  await deleteCardFromFirestore<StaffType>({
    nameCollection: 'staff',
    id,
    productName: staffName,
  });

  getDataOnDemand(pathesForStaffCard);
};
// _____________________________________
export const moveUpStaffCard = async (id: number) => {
  await moveUpCardInsideFirestore<StaffType>('staff', id);

  getDataOnDemand(pathesForStaffCard);
};
// ______________________________________
export const moveDownStaffCard = async (id: number) => {
  await moveDownCardInsideFirestore<StaffType>('staff', id);

  getDataOnDemand(pathesForStaffCard);
};
// ================================================================================
