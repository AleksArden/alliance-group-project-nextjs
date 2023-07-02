import firebase_app from './config';
import { getFirestore, setDoc, doc } from 'firebase/firestore';
import { AboutUsType } from 'types/dataTypeForFirebase';
import { getDatabase, ref, set } from 'firebase/database';

const db = getFirestore(firebase_app);

export const addDataToFirestore = async (
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

export const addDataToRealtimeDatabase = (
  data: AboutUsType,
  sectionName: string
) => {
  const db = getDatabase();
  set(ref(db, `content-site/${sectionName}`), data);
};
