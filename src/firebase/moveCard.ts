import firebase_app from './config';
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from 'firebase/firestore';

import { addCardToFirestore } from './addData';

const db = getFirestore(firebase_app);

export const moveUpCardInsideFirestore = async <T extends { id: number }>(
  nameCollection: string,
  id: number
): Promise<void> => {
  try {
    let arrayMovingCards: T[] = [];

    const refFirstCard = query(
      collection(db, nameCollection),
      where('id', '==', id - 1)
    );
    const firstCardSnapshot = await getDocs(refFirstCard);

    firstCardSnapshot.forEach(doc => {
      arrayMovingCards.push({ ...doc.data() } as T);
    });

    const refSecondCard = query(
      collection(db, nameCollection),
      where('id', '==', id)
    );
    const secondCardSnapshot = await getDocs(refSecondCard);

    secondCardSnapshot.forEach(doc => {
      arrayMovingCards.push({ ...doc.data() } as T);
    });
    await moveCards<T>(arrayMovingCards, nameCollection);
  } catch (error) {
    console.log(error);
  }
};
// ________________________________________________________
export const moveDownCardInsideFirestore = async <T extends { id: number }>(
  nameCollection: string,
  id: number
) => {
  try {
    let arrayMovingCards: T[] = [];
    const refFirstCard = query(
      collection(db, nameCollection),
      where('id', '==', id + 1)
    );
    const firstCardSnapshot = await getDocs(refFirstCard);

    firstCardSnapshot.forEach(doc => {
      arrayMovingCards.push({ ...doc.data() } as T);
    });

    const refSecondCard = query(
      collection(db, nameCollection),
      where('id', '==', id)
    );
    const secondCardSnapshot = await getDocs(refSecondCard);

    secondCardSnapshot.forEach(doc => {
      arrayMovingCards.push({ ...doc.data() } as T);
    });
    await moveCards<T>(arrayMovingCards, nameCollection);
  } catch (error) {
    console.log(error);
  }
};
// ___________________________________________
const moveCards = async <T extends { id: number }>(
  arrayMovingCards: T[],
  nameCollection: string
) => {
  try {
    const firstId = arrayMovingCards[0].id;
    const secondId = arrayMovingCards[1].id;
    arrayMovingCards[0].id = secondId;
    arrayMovingCards[1].id = firstId;

    await addCardToFirestore<T>(
      nameCollection,
      ('0' + firstId).slice(-2),
      arrayMovingCards[1]
    );
    await addCardToFirestore<T>(
      nameCollection,
      ('0' + secondId).slice(-2),
      arrayMovingCards[0]
    );
  } catch (error) {
    console.log(error);
  }
};
// ===========================================================================

// export const moveUpServiceCardInsideFirestore = async (
//   nameCollection: string,
//   id: number
// ) => {
//   let arrayMovingCards: ProductServiceType[] = [];

//   const refFirstCard = query(
//     collection(db, nameCollection),
//     where('id', '==', id - 1)
//   );
//   const firstCardSnapshot = await getDocs(refFirstCard);

//   firstCardSnapshot.forEach(doc => {
//     arrayMovingCards.push({ ...doc.data() } as ProductServiceType);
//   });

//   const refSecondCard = query(
//     collection(db, nameCollection),
//     where('id', '==', id)
//   );
//   const secondCardSnapshot = await getDocs(refSecondCard);

//   secondCardSnapshot.forEach(doc => {
//     arrayMovingCards.push({ ...doc.data() } as ProductServiceType);
//   });
//   await moveServiceCards(arrayMovingCards, nameCollection);
// };
// // ________________________________________________________
// export const moveDownServiceCardInsideFirestore = async (
//   nameCollection: string,
//   id: number
// ) => {
//   let arrayMovingCards: ProductServiceType[] = [];
//   const refFirstCard = query(
//     collection(db, nameCollection),
//     where('id', '==', id + 1)
//   );
//   const firstCardSnapshot = await getDocs(refFirstCard);

//   firstCardSnapshot.forEach(doc => {
//     arrayMovingCards.push({ ...doc.data() } as ProductServiceType);
//   });

//   const refSecondCard = query(
//     collection(db, nameCollection),
//     where('id', '==', id)
//   );
//   const secondCardSnapshot = await getDocs(refSecondCard);

//   secondCardSnapshot.forEach(doc => {
//     arrayMovingCards.push({ ...doc.data() } as ProductServiceType);
//   });
//   await moveServiceCards(arrayMovingCards, nameCollection);
// };
// // ___________________________________________
// const moveServiceCards = async (
//   arrayMovingCards: ProductServiceType[],
//   nameCollection: string
// ) => {
//   const firstId = arrayMovingCards[0].id;
//   const secondId = arrayMovingCards[1].id;
//   arrayMovingCards[0].id = secondId;
//   arrayMovingCards[1].id = firstId;

//   await addCardToFirestore(
//     nameCollection,
//     ('0' + firstId).slice(-2),
//     arrayMovingCards[1]
//   );
//   await addCardToFirestore(
//     nameCollection,
//     ('0' + secondId).slice(-2),
//     arrayMovingCards[0]
//   );
// };
// // =====================================================================
// export const moveUpProductCardInsideFirestore = async (
//   nameCollection: string,
//   id: number
// ) => {
//   let arrayMovingCards: ProductServiceType[] = [];

//   const refFirstCard = query(
//     collection(db, nameCollection),
//     where('id', '==', id - 1)
//   );
//   const firstCardSnapshot = await getDocs(refFirstCard);

//   firstCardSnapshot.forEach(doc => {
//     arrayMovingCards.push({ ...doc.data() } as ProductServiceType);
//   });

//   const refSecondCard = query(
//     collection(db, nameCollection),
//     where('id', '==', id)
//   );
//   const secondCardSnapshot = await getDocs(refSecondCard);

//   secondCardSnapshot.forEach(doc => {
//     arrayMovingCards.push({ ...doc.data() } as ProductServiceType);
//   });
//   await moveProductCards(arrayMovingCards, nameCollection);
// };
// // __________________________________
// export const moveDownProductCardInsideFirestore = async (
//   nameCollection: string,
//   id: number
// ) => {
//   let arrayMovingCards: ProductServiceType[] = [];
//   const refFirstCard = query(
//     collection(db, nameCollection),
//     where('id', '==', id + 1)
//   );
//   const firstCardSnapshot = await getDocs(refFirstCard);

//   firstCardSnapshot.forEach(doc => {
//     arrayMovingCards.push({ ...doc.data() } as ProductServiceType);
//   });

//   const refSecondCard = query(
//     collection(db, nameCollection),
//     where('id', '==', id)
//   );
//   const secondCardSnapshot = await getDocs(refSecondCard);

//   secondCardSnapshot.forEach(doc => {
//     arrayMovingCards.push({ ...doc.data() } as ProductServiceType);
//   });
//   await moveProductCards(arrayMovingCards, nameCollection);
// };
// // ____________________
// const moveProductCards = async (
//   arrayMovingCards: ProductServiceType[],
//   nameCollection: string
// ) => {
//   const firstId = arrayMovingCards[0].id;
//   const secondId = arrayMovingCards[1].id;
//   arrayMovingCards[0].id = secondId;
//   arrayMovingCards[1].id = firstId;

//   await addCardToFirestore(
//     nameCollection,
//     ('0' + firstId).slice(-2),
//     arrayMovingCards[1]
//   );
//   await addCardToFirestore(
//     nameCollection,
//     ('0' + secondId).slice(-2),
//     arrayMovingCards[0]
//   );
// };
// // ==========================================================================
// export const moveUpStaffCardInsideFirestore = async (
//   nameCollection: string,
//   id: number
// ) => {
//   let arrayMovingCards: StaffType[] = [];

//   const refFirstCard = query(
//     collection(db, nameCollection),
//     where('id', '==', id - 1)
//   );
//   const firstCardSnapshot = await getDocs(refFirstCard);

//   firstCardSnapshot.forEach(doc => {
//     arrayMovingCards.push({ ...doc.data() } as StaffType);
//   });

//   const refSecondCard = query(
//     collection(db, nameCollection),
//     where('id', '==', id)
//   );
//   const secondCardSnapshot = await getDocs(refSecondCard);

//   secondCardSnapshot.forEach(doc => {
//     arrayMovingCards.push({ ...doc.data() } as StaffType);
//   });
//   await moveStaffCards(arrayMovingCards, nameCollection);
// };

// export const moveDownStaffCardInsideFirestore = async (
//   nameCollection: string,
//   id: number
// ) => {
//   let arrayMovingCards: StaffType[] = [];
//   const refFirstCard = query(
//     collection(db, nameCollection),
//     where('id', '==', id + 1)
//   );
//   const firstCardSnapshot = await getDocs(refFirstCard);

//   firstCardSnapshot.forEach(doc => {
//     arrayMovingCards.push({ ...doc.data() } as StaffType);
//   });

//   const refSecondCard = query(
//     collection(db, nameCollection),
//     where('id', '==', id)
//   );
//   const secondCardSnapshot = await getDocs(refSecondCard);

//   secondCardSnapshot.forEach(doc => {
//     arrayMovingCards.push({ ...doc.data() } as StaffType);
//   });
//   await moveStaffCards(arrayMovingCards, nameCollection);
// };

// const moveStaffCards = async (
//   arrayMovingCards: StaffType[],
//   nameCollection: string
// ) => {
//   const firstId = arrayMovingCards[0].id;
//   const secondId = arrayMovingCards[1].id;
//   arrayMovingCards[0].id = secondId;
//   arrayMovingCards[1].id = firstId;

//   await addCardToFirestore(
//     nameCollection,
//     ('0' + firstId).slice(-2),
//     arrayMovingCards[1]
//   );
//   await addCardToFirestore(
//     nameCollection,
//     ('0' + secondId).slice(-2),
//     arrayMovingCards[0]
//   );
// };
