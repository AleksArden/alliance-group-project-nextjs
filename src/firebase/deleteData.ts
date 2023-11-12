import firebase_app from './config';
import {
  getFirestore,
  doc,
  deleteDoc,
  collection,
  query,
  where,
  getDocs,
} from 'firebase/firestore';
import { getStorage, ref, deleteObject } from 'firebase/storage';
import { addServiceToFirestore } from './addData';
import { ServiceType } from 'types/dataTypeForFirebase';
const db = getFirestore(firebase_app);
const storage = getStorage();

export const deleteData = async (
  nameCollection: string,
  id: number,
  imageName: string
) => {
  // console.log('funcId', id);
  try {
    await deleteDoc(doc(db, nameCollection, id.toString()));
    // console.log('deleteDoc');

    await deleteFile(nameCollection, imageName);

    await chengeId(nameCollection, id);
  } catch (error) {
    console.log(error);
  }
};

export const deleteFile = async (nameCollection: string, imageName: string) => {
  try {
    const desertRef = ref(storage, `${nameCollection}/${imageName}`);
    await deleteObject(desertRef);
    // console.log('deleteFile');
  } catch (error) {
    console.log(error);
  }
};

const chengeId = async (nameCollection: string, id: number) => {
  try {
    const q = query(collection(db, nameCollection), where('id', '>', id));
    const querySnapshot = await getDocs(q);
    // console.log('funcChangeId');
    let arr: ServiceType[] = [];

    querySnapshot.forEach(doc => {
      arr.push({ ...doc.data() } as ServiceType);
    });

    const arrId: number[] = [];

    arr.forEach(item => {
      arrId.push(item.id);
      const id = item.id - 1;
      item.id = id;
      addServiceToFirestore(nameCollection, id.toString(), item);
    });

    await deleteDoc(doc(db, nameCollection, arrId.reverse()[0].toString()));
    console.log(arr);
  } catch (error) {
    console.log(error);
  }
};
