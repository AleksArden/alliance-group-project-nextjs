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

import {
  GalleryImageURLType,
  ProductServiceType,
  StaffType,
} from 'types/dataTypeForFirebase';
import { addCardToFirestore } from './addData';
import { deleteImageFromStorage } from './uploadAndDeleteImage';
const db = getFirestore(firebase_app);
// ===============================================================
type DeleteCardFromFirestore = {
  nameCollection: string;
  id: number;
  productName: string;
  galleryImagesURL?: GalleryImageURLType[];
};
// ________________
export const deleteCardFromFirestore = async ({
  nameCollection,
  id,
  productName,
  galleryImagesURL,
}: DeleteCardFromFirestore): Promise<void> => {
  try {
    await deleteDoc(doc(db, nameCollection, ('0' + id).slice(-2)));

    await deleteImageFromStorage(nameCollection, productName, galleryImagesURL);

    if (nameCollection === 'services') {
      await changeServiseId(nameCollection, id);
    }
    if (nameCollection === 'products') {
      await changeProductId(nameCollection, id);
    }

    if (nameCollection === 'staff') {
      await changeStaffId(nameCollection, id);
    }
  } catch (error) {
    console.log(error);
  }
};
// ==========================================
const changeServiseId = async (nameCollection: string, id: number) => {
  try {
    const q = query(collection(db, nameCollection), where('id', '>', id));
    const querySnapshot = await getDocs(q);

    let arrayMovingCards: ProductServiceType[] = [];

    querySnapshot.forEach(doc => {
      arrayMovingCards.push({ ...doc.data() } as ProductServiceType);
    });

    const arrayIdMovingCards: number[] = [];

    arrayMovingCards.forEach(card => {
      arrayIdMovingCards.push(card.id);

      card.id = card.id - 1;
      addCardToFirestore(nameCollection, ('0' + card.id).slice(-2), card);
    });

    await deleteDoc(
      doc(db, nameCollection, ('0' + arrayIdMovingCards.reverse()[0]).slice(-2))
    );
  } catch (error) {
    console.log(error);
  }
};
// =========================================================
const changeProductId = async (nameCollection: string, id: number) => {
  try {
    const q = query(collection(db, nameCollection), where('id', '>', id));
    const querySnapshot = await getDocs(q);

    let arrayMovingCards: ProductServiceType[] = [];

    querySnapshot.forEach(doc => {
      arrayMovingCards.push({ ...doc.data() } as ProductServiceType);
    });

    const arrayIdMovingCards: number[] = [];

    arrayMovingCards.forEach(card => {
      arrayIdMovingCards.push(card.id);

      card.id = card.id - 1;
      addCardToFirestore(nameCollection, ('0' + card.id).slice(-2), card);
    });

    await deleteDoc(
      doc(db, nameCollection, ('0' + arrayIdMovingCards.reverse()[0]).slice(-2))
    );
  } catch (error) {
    console.log(error);
  }
};
// =======================================================================
const changeStaffId = async (nameCollection: string, id: number) => {
  try {
    const q = query(collection(db, nameCollection), where('id', '>', id));
    const querySnapshot = await getDocs(q);

    let arrayMovingCards: StaffType[] = [];

    querySnapshot.forEach(doc => {
      arrayMovingCards.push({ ...doc.data() } as StaffType);
    });

    const arrayIdMovingCards: number[] = [];

    arrayMovingCards.forEach(card => {
      arrayIdMovingCards.push(card.id);

      card.id = card.id - 1;
      addCardToFirestore(nameCollection, ('0' + card.id).slice(-2), card);
    });

    await deleteDoc(
      doc(db, nameCollection, ('0' + arrayIdMovingCards.reverse()[0]).slice(-2))
    );
  } catch (error) {
    console.log(error);
  }
};
