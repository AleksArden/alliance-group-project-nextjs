import { AddStaffType } from 'types/dataTypeForFirebase';
import firebase_app from './config';
import {
  getFirestore,
  setDoc,
  doc,
  collection,
  addDoc,
} from 'firebase/firestore';

const db = getFirestore(firebase_app);

export const addDataToFirestore = async (
  nameCollection: string,
  idCollection: string,
  data: {}
) => {
  try {
    await setDoc(doc(db, nameCollection, idCollection), data);
  } catch (error) {
    console.log(error);
  }
};

export const addStaffToFirestore = async (
  nameCollection: string,

  data: AddStaffType
) => {
  try {
    await addDoc(collection(db, nameCollection), data);
  } catch (error) {
    console.log(error);
  }
};
