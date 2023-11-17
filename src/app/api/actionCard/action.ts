'use server';

import { addCardToFirestore } from '@/firebase/addData';
import { deleteCardFromFirestore } from '@/firebase/deleteData';
import {
  moveDownCardInsideFirestore,
  moveUpCardInsideFirestore,
} from '@/firebase/moveCard';
import { revalidatePath } from 'next/cache';
import { ServiceType } from 'types/dataTypeForFirebase';

export const submitServiceCard = async (data: ServiceType) => {
  console.log('ServiceForm', data);
  await addCardToFirestore('services', data.id.toString(), data);
  revalidatePath('/');
  revalidatePath('/admin/services');
};
export const deleteServiceCard = async (id: number, imageName: string) => {
  await deleteCardFromFirestore('services', id, imageName);
  revalidatePath('/');
  revalidatePath('/admin/services');
};

export const moveUpServiceCard = async (id: number) => {
  await moveUpCardInsideFirestore('services', id);
  revalidatePath('/');
  revalidatePath('/admin/services');
};
export const moveDownServiceCard = async (id: number) => {
  await moveDownCardInsideFirestore('services', id);
  revalidatePath('/');
  revalidatePath('/admin/services');
};
