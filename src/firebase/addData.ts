import firebase_app from './config';
import { getFirestore, setDoc, doc } from 'firebase/firestore';
import { AboutUsType } from 'types/dataTypeForFirebase';

const db = getFirestore(firebase_app);

export const addDataToServer = async (
  nameCollection: string,
  idCollection: string,
  data: AboutUsType
) => {
  try {
    await setDoc(doc(db, nameCollection, idCollection), data);
  } catch (error) {
    console.log(error);
  }
};
