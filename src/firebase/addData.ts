import {
  AboutUsType,
  ContactsType,
  GalleryType,
  HomePageType,
  HomeProductsType,
  HomeServicesType,
  IntroType,
  ProductType,
  ProductsServicesType,
  ServiceType,
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
    | AboutUsType
    | GalleryType
    | ProductsServicesType
) => {
  try {
    await setDoc(doc(db, nameCollection, idCollection), data);
  } catch (error) {
    console.log(error);
  }
};

export const addCardToFirestore = async (
  nameCollection: string,
  id: string,
  data: ServiceType | ProductType | StaffType
) => {
  console.log('firebase', data);
  try {
    await setDoc(doc(db, nameCollection, id), data);
  } catch (error) {
    console.log(error);
  }
};
