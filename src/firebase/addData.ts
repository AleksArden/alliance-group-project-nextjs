import {
  AboutCompanyType,
  ContactsType,
  GalleryType,
  HomePageType,
  HomeProductsType,
  HomeServicesType,
  IntroType,
  ProductServiceType,
  ProductsServicesType,
  StaffType,
} from 'types/dataTypeForFirebase';
import firebase_app from './config';
import { getFirestore, setDoc, doc } from 'firebase/firestore';

const db = getFirestore(firebase_app);

export const addDataToFirestore = async (
  nameCollection: string,
  idCollection: string,
  data:
    | HomePageType
    | ContactsType
    | IntroType
    | HomeProductsType
    | HomeServicesType
    | AboutCompanyType
    | GalleryType
    | ProductsServicesType
): Promise<void> => {
  try {
    await setDoc(doc(db, nameCollection, idCollection), data);
  } catch (error) {
    console.log(error);
  }
};

export const addCardToFirestore = async (
  nameCollection: string,
  id: string,
  data: ProductServiceType | StaffType
): Promise<void> => {
  try {
    await setDoc(doc(db, nameCollection, id), data);
  } catch (error) {
    console.log(error);
  }
};
