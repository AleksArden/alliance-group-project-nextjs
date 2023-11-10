import firebase_app from './config';
import { getFirestore, doc, deleteDoc } from 'firebase/firestore';
import { getStorage, ref, deleteObject } from 'firebase/storage';
const db = getFirestore(firebase_app);
const storage = getStorage();

export const deleteData = async (
  nameCollection: string,
  id: string,
  imageName: string
) => {
  console.log('func', id);
  try {
    await deleteDoc(doc(db, nameCollection, id));

    const desertRef = ref(storage, `${nameCollection}/${imageName}`);
    await deleteObject(desertRef);
  } catch (error) {
    console.log(error);
  }
};
