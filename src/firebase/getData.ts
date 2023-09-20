import firebase_app from './config';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { cache } from 'react';
import {
  AboutUsType,
  ContactsType,
  HomePageType,
} from 'types/dataTypeForFirebase';

export const getDataHomePageFromFirestore = cache(async () => {
  const db = getFirestore(firebase_app);
  const docRef = doc(db, 'content for site', 'home');
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data() as HomePageType;
  } else {
    console.log('No such document!');
  }
});

export const getDataContactsFromFirestore = cache(async () => {
  const db = getFirestore(firebase_app);
  const docRef = doc(db, 'content for site', 'contacts');
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data() as ContactsType;
  } else {
    console.log('No such document!');
  }
});
export const getDataAboutUsFromFirestore = cache(async () => {
  const db = getFirestore(firebase_app);
  const docRef = doc(db, 'content for site', 'aboutUs');
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data() as AboutUsType;
  } else {
    console.log('No such document!');
  }
});
