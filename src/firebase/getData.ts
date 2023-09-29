import firebase_app from './config';
import {
  getFirestore,
  doc,
  getDoc,
  collection,
  getDocs,
} from 'firebase/firestore';
import { cache } from 'react';
import {
  AboutUsType,
  AddStaffTypeWithId,
  ContactsType,
  HomePageType,
} from 'types/dataTypeForFirebase';
const db = getFirestore(firebase_app);

export const getDataHomePageFromFirestore = cache(async () => {
  const docRef = doc(db, 'content for site', 'home');
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data() as HomePageType;
  } else {
    console.log('No such document!');
  }
});

export const getDataContactsFromFirestore = cache(async () => {
  const docRef = doc(db, 'content for site', 'contacts');
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data() as ContactsType;
  } else {
    console.log('No such document!');
  }
});
export const getDataAboutUsFromFirestore = cache(async () => {
  const docRef = doc(db, 'content for site', 'aboutUs');
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data() as AboutUsType;
  } else {
    console.log('No such document!');
  }
});
export const getAllStaff = async () => {
  try {
    const staff: AddStaffTypeWithId[] = [];
    const querySnapshot = await getDocs(collection(db, 'staff'));

    querySnapshot.forEach(doc => {
      staff.push({ ...doc.data(), id: doc.id } as AddStaffTypeWithId);
    });

    return staff;
  } catch (error) {
    console.log(error);
  }
};
