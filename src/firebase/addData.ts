import firebase_app from './config';
import {
  getFirestore,
  setDoc,
  doc,
  WithFieldValue,
  DocumentData,
} from 'firebase/firestore';

const db = getFirestore(firebase_app);

//=================================================================================
export const addDataToFirestore = async <
  T extends WithFieldValue<DocumentData>
>(
  nameCollection: string,
  idCollection: string,
  data: T
): Promise<void> => {
  try {
    await setDoc(doc(db, nameCollection, idCollection), data);
  } catch (error) {
    console.log(error);
  }
};

// ================================================================================
export const addCardToFirestore = async <
  T extends WithFieldValue<DocumentData>
>(
  nameCollection: string,
  id: string,
  data: T
): Promise<void> => {
  try {
    await setDoc(doc(db, nameCollection, id), data);
  } catch (error) {
    console.log(error);
  }
};
// =================================================================================
