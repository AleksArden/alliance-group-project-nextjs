import firebase_app from './config';
import { getFirestore, doc, deleteDoc } from 'firebase/firestore';
const db = getFirestore(firebase_app);

export const deleteData = async (nameCollection: string, id: string) => {
  console.log('func', id);
  await deleteDoc(doc(db, nameCollection, id));
};
