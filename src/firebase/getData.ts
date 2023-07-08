import firebase_app from './config';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getDatabase, ref, onValue } from 'firebase/database';
import { cache } from 'react';
import { AboutUsType } from 'types/dataTypeForFirebase';

export const getDataFromFirestore = cache(
  async (idCollection: string): Promise<AboutUsType | undefined> => {
    const db = getFirestore(firebase_app);
    const docRef = doc(db, 'content', idCollection);
    const docSnap = await getDoc(docRef);
    console.log('getData', docSnap.data());

    if (docSnap.exists()) {
      return docSnap.data() as AboutUsType;
      // console.log('Document data:', docSnap.data());
    } else {
      // docSnap.data() will be undefined in this case
      console.log('No such document!');
    }
  }
);

export const getDataFromRealtimeDatabase = (sectionName: string) => {
  const db = getDatabase();
  const dataRef = ref(db, `content-site/${sectionName}`);
  onValue(dataRef, snapshot => {
    const data = snapshot.val();
    console.log(data);
  });
};
