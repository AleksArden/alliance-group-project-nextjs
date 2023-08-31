import firebase_app from './config';
import { getFirestore, setDoc, doc } from 'firebase/firestore';
import { AboutUsType, HomePageType } from 'types/dataTypeForFirebase';

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
export const addDataHomePageToFirestore = async (
  nameCollection: string,
  idCollection: string,
  data: HomePageType
) => {
  try {
    await setDoc(doc(db, nameCollection, idCollection), data);
  } catch (error) {
    console.log(error);
  }
};
