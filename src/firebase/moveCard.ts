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

import { ServiceType } from 'types/dataTypeForFirebase';
import { addCardToFirestore } from './addData';
const db = getFirestore(firebase_app);

export const moveUpCardInsideFirestore = async (
  nameCollection: string,
  id: number
) => {
  let arrayMovingCards: ServiceType[] = [];

  const refFirstCard = query(
    collection(db, nameCollection),
    where('id', '==', id - 1)
  );
  const firstCardSnapshot = await getDocs(refFirstCard);
  // console.log('funcChangeId');

  firstCardSnapshot.forEach(doc => {
    arrayMovingCards.push({ ...doc.data() } as ServiceType);
  });

  const refSecondCard = query(
    collection(db, nameCollection),
    where('id', '==', id)
  );
  const secondCardSnapshot = await getDocs(refSecondCard);
  // console.log('funcChangeId');

  secondCardSnapshot.forEach(doc => {
    arrayMovingCards.push({ ...doc.data() } as ServiceType);
  });
  moveCards(arrayMovingCards, nameCollection);

  // arrayMovingCards[0].id = 0;
  // await addCardToFirestore(
  //   nameCollection,
  //   arrayMovingCards[0].id.toString(),
  //   arrayMovingCards[0]
  // );
  // arrayMovingCards[1].id = id - 1;
  // await addCardToFirestore(
  //   nameCollection,
  //   arrayMovingCards[1].id.toString(),
  //   arrayMovingCards[1]
  // );
  // arrayMovingCards[0].id = id;
  // await addCardToFirestore(
  //   nameCollection,
  //   arrayMovingCards[0].id.toString(),
  //   arrayMovingCards[0]
  // );
  // await deleteDoc(doc(db, nameCollection, '0'));
};

export const moveDownCardInsideFirestore = async (
  nameCollection: string,
  id: number
) => {
  let arrayMovingCards: ServiceType[] = [];
  const refFirstCard = query(
    collection(db, nameCollection),
    where('id', '==', id + 1)
  );
  const firstCardSnapshot = await getDocs(refFirstCard);
  // console.log('funcChangeId');

  firstCardSnapshot.forEach(doc => {
    arrayMovingCards.push({ ...doc.data() } as ServiceType);
  });

  const refSecondCard = query(
    collection(db, nameCollection),
    where('id', '==', id)
  );
  const secondCardSnapshot = await getDocs(refSecondCard);
  // console.log('funcChangeId');

  secondCardSnapshot.forEach(doc => {
    arrayMovingCards.push({ ...doc.data() } as ServiceType);
  });
  moveCards(arrayMovingCards, nameCollection);
};

const moveCards = async (
  arrayMovingCards: ServiceType[],
  nameCollection: string
) => {
  const firstId = arrayMovingCards[0].id;
  const secondId = arrayMovingCards[1].id;
  arrayMovingCards[0].id = secondId;
  arrayMovingCards[1].id = firstId;

  await addCardToFirestore(
    nameCollection,
    firstId.toString(),
    arrayMovingCards[1]
  );
  await addCardToFirestore(
    nameCollection,
    secondId.toString(),
    arrayMovingCards[0]
  );
};
