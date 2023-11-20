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

  await addCardToFirestore('services', ('0' + data.id).slice(-2), data);
  revalidatePath('/');
  revalidatePath('/admin/services');
};
export const deleteServiceCard = async (id: number, imageName: string) => {
  await deleteCardFromFirestore('services', id, imageName);
  revalidatePath('/');
  revalidatePath('/admin/services');
};

export const moveUpServiceCard = async (id: number) => {
  await moveUpServiceCardInsideFirestore('services', id);
  revalidatePath('/');
  revalidatePath('/admin/services');
};
export const moveDownServiceCard = async (id: number) => {
  await moveDownServiceCardInsideFirestore('services', id);
  revalidatePath('/');
  revalidatePath('/admin/services');
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

  await addCardToFirestore('staff', ('0' + data.id).slice(-2), data);
  revalidatePath('/about-us');
  revalidatePath('/admin/staff-list');
};
export const deleteStaffCard = async (id: number, imageName: string) => {
  await deleteCardFromFirestore('staff', id, imageName);
  revalidatePath('/about-us');
  revalidatePath('/admin/staff-list');
};

export const moveUpStaffCard = async (id: number) => {
  await moveUpStaffCardInsideFirestore('staff', id);
  revalidatePath('/about-us');
  revalidatePath('/admin/staff-list');
};
export const moveDownStaffCard = async (id: number) => {
  await moveDownStaffCardInsideFirestore('staff', id);
  revalidatePath('/about-us');
  revalidatePath('/admin/staff-list');
};
