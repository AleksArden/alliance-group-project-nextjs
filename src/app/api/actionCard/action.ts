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
import { revalidatePath } from 'next/cache';
import { ProductType, ServiceType, StaffType } from 'types/dataTypeForFirebase';

export const submitServiceCard = async (data: ServiceType) => {
  console.log('ServiceForm', data);

  revalidatePath('/uk');
  revalidatePath('/en');
  revalidatePath('/tr');
  revalidatePath('/admin/services');
  await addCardToFirestore('services', ('0' + data.id).slice(-2), data);
};
export const deleteServiceCard = async (id: number, imageName: string) => {
  revalidatePath('/');
  revalidatePath('/admin/services');
  await deleteCardFromFirestore('services', id, imageName);
};

export const moveUpServiceCard = async (id: number) => {
  revalidatePath('/');
  revalidatePath('/admin/services');
  await moveUpServiceCardInsideFirestore('services', id);
};
export const moveDownServiceCard = async (id: number) => {
  revalidatePath('/');
  revalidatePath('/admin/services');
  await moveDownServiceCardInsideFirestore('services', id);
};

export const submitProductCard = async (data: ProductType) => {
  console.log('ProductForm', data);
  await addCardToFirestore('products', ('0' + data.id).slice(-2), data);
  revalidatePath('/');
  revalidatePath('/admin/products');
};

export const deleteProductCard = async (id: number, imageName: string) => {
  await deleteCardFromFirestore('products', id, imageName);
  revalidatePath('/');
  revalidatePath('/admin/products');
};

export const moveUpProductCard = async (id: number) => {
  await moveUpProductCardInsideFirestore('products', id);
  revalidatePath('/');
  revalidatePath('/admin/products');
};
export const moveDownProductCard = async (id: number) => {
  await moveDownProductCardInsideFirestore('products', id);
  revalidatePath('/');
  revalidatePath('/admin/products');
};

export const submitStaffCard = async (data: StaffType) => {
  console.log('StaffForm', data);

  revalidatePath('/uk/about-us');
  revalidatePath('/en/about-us');
  revalidatePath('/tr/about-us');
  revalidatePath('/admin/staff-list');
  await addCardToFirestore('staff', ('0' + data.id).slice(-2), data);
};
export const deleteStaffCard = async (id: number, imageName: string) => {
  revalidatePath('/uk/about-us');
  revalidatePath('/en/about-us');
  revalidatePath('/tr/about-us');
  revalidatePath('/admin/staff-list');
  await deleteCardFromFirestore('staff', id, imageName);
};

export const moveUpStaffCard = async (id: number) => {
  revalidatePath('/uk/about-us');
  revalidatePath('/en/about-us');
  revalidatePath('/tr/about-us');
  revalidatePath('/admin/staff-list');
  await moveUpStaffCardInsideFirestore('staff', id);
};
export const moveDownStaffCard = async (id: number) => {
  revalidatePath('/uk/about-us');
  revalidatePath('/en/about-us');
  revalidatePath('/tr/about-us');
  revalidatePath('/admin/staff-list');
  await moveDownStaffCardInsideFirestore('staff', id);
};
