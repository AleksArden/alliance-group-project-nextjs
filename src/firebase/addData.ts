import { StaffType } from 'types/dataTypeForFirebase';
import firebase_app from './config';
import { getFirestore, setDoc, doc } from 'firebase/firestore';

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
  order: string,
  data: StaffType
) => {
  try {
    await setDoc(doc(db, nameCollection, order), data);
  } catch (error) {
    console.log(error);
  }
};
