import firebase_app from './config';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { cache } from 'react';
import { AboutUsType, HomePageType } from 'types/dataTypeForFirebase';

export const getDataAboutUsFromFirestore = cache(
  async (): Promise<AboutUsType | undefined> => {
    const db = getFirestore(firebase_app);
    const docRef = doc(db, 'content', 'about-us');
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data() as AboutUsType;
    } else {
      console.log('No such document!');
    }
  }
);

export const getDataHomePageFromFirestore = cache(
  async (): Promise<HomePageType | undefined> => {
    const db = getFirestore(firebase_app);
    const docRef = doc(db, 'content', 'home-page');
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data() as HomePageType;
    } else {
      console.log('No such document!');
    }
  }
);
