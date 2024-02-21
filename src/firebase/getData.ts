import firebase_app from './config';
import {
  getFirestore,
  doc,
  getDoc,
  collection,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { cache } from 'react';
import { ProductServiceType } from 'types/dataTypeForFirebase';
const db = getFirestore(firebase_app);

export const getDataFromFirestore = cache(
  async <T>(nameDocument: string): Promise<T | undefined> => {
    const docRef = doc(db, 'contentForPages', nameDocument);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data() as T;
    } else {
      console.log('No such document!');
    }
  }
);

// =============================================================
export const getAllCards = cache(
  async <T>(nameCollection: string): Promise<T[] | undefined> => {
    try {
      const cards: T[] = [];
      const querySnapshot = await getDocs(collection(db, nameCollection));

      querySnapshot.forEach(doc => {
        cards.push({ ...doc.data() } as T);
      });

      return cards;
    } catch (error) {
      console.log(error);
    }
  }
);

// ========================================================================
export const getOneProductOrService = cache(
  async (
    nameCollection: string,
    fieldName: string
  ): Promise<ProductServiceType | undefined> => {
    let arrayChooseProduct: ProductServiceType[] = [];

    try {
      const q = query(
        collection(db, nameCollection),
        where('nameEN', '==', fieldName)
      );

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(doc => {
        arrayChooseProduct.push({ ...doc.data() } as ProductServiceType);
      });
      return arrayChooseProduct[0];
    } catch (error) {
      console.log(error);
    }
  }
);
// ========================================================================
