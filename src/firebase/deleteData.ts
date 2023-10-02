import firebase_app from './config';
import { getFirestore, doc, deleteDoc } from 'firebase/firestore';
const db = getFirestore(firebase_app);

export const deleteStaff = async (order: string) => {
  console.log('func', order);
  await deleteDoc(doc(db, 'staff', order));
};
