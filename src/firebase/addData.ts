import { ProductType, ServiceType, StaffType } from 'types/dataTypeForFirebase';
import firebase_app from './config';
import {
  getFirestore,
  setDoc,
  doc,
  addDoc,
  collection,
  updateDoc,
  serverTimestamp,
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

export const addCardToFirestore = async (
  nameCollection: string,
  id: string,
  data: ServiceType
) => {
  try {
    await setDoc(doc(db, nameCollection, id), data);
    // const docRef = doc(db, nameCollection, id);
    // await updateDoc(docRef, {
    //   timestamp: serverTimestamp(),
    // });
  } catch (error) {
    console.log(error);
  }
};
