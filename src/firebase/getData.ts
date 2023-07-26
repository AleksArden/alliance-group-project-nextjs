import firebase_app from './config';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { cache } from 'react';
import { AboutUsType } from 'types/dataTypeForFirebase';

export const getDataFromFirestore = cache(
  async (idCollection: string): Promise<AboutUsType | undefined> => {
    const db = getFirestore(firebase_app);
    const docRef = doc(db, 'content', idCollection);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data() as AboutUsType;
    } else {
      console.log('No such document!');
    }
  }
);
