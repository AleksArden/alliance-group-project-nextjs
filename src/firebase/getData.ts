import firebase_app from './config';
import { getFirestore, doc, onSnapshot } from 'firebase/firestore';

const db = getFirestore(firebase_app);

export const getDataFromServer = async (
  nameCollection: string,
  idCollection: string
) => {
  const unsub = onSnapshot(doc(db, nameCollection, idCollection), doc => {
    console.log('Current data: ', doc.data());
    return doc.data();
  });
};
