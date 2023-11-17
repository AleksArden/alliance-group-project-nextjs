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

import { ServiceType } from 'types/dataTypeForFirebase';
import { addCardToFirestore } from './addData';
const db = getFirestore(firebase_app);
const storage = getStorage();

export const deleteCardFromFirestore = async (
  nameCollection: string,
  id: number,
  imageName: string
) => {
  // console.log('funcId', id);
  try {
    await deleteDoc(doc(db, nameCollection, id.toString()));
    // console.log('deleteDoc');

    await deleteFileFromStorage(nameCollection, imageName);

    await chengeId(nameCollection, id);
  } catch (error) {
    console.log(error);
  }
};

const deleteFileFromStorage = async (
  nameCollection: string,
  imageName: string
) => {
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
    let arrayMovingCards: ServiceType[] = [];

    querySnapshot.forEach(doc => {
      arrayMovingCards.push({ ...doc.data() } as ServiceType);
    });

    const arrayIdMovingCards: number[] = [];

    arrayMovingCards.forEach(card => {
      arrayIdMovingCards.push(card.id);

      card.id = card.id - 1;
      addCardToFirestore(nameCollection, card.id.toString(), card);
    });

    await deleteDoc(
      doc(db, nameCollection, arrayIdMovingCards.reverse()[0].toString())
    );
  } catch (error) {
    console.log(error);
  }
};
