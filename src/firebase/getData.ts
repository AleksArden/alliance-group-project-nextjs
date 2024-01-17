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
import {
  AboutUsType,
  StaffType,
  ContactsType,
  HomePageType,
  IntroType,
  HomeProductsType,
  HomeServicesType,
  ServiceType,
  GalleryType,
  ProductsServicesType,
  ProductServiceType,
} from 'types/dataTypeForFirebase';
const db = getFirestore(firebase_app);

export const getDataHomePageFromFirestore = cache(async () => {
  const docRef = doc(db, 'content for site', 'home');
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data() as Promise<HomePageType>;
  } else {
    console.log('No such document!');
  }
});

export const getDataContactsFromFirestore = cache(async () => {
  const docRef = doc(db, 'content for site', 'contacts');
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data() as Promise<ContactsType>;
  } else {
    console.log('No such document!');
  }
});
export const getDataAboutUsFromFirestore = cache(async () => {
  const docRef = doc(db, 'content for site', 'aboutUs');
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data() as Promise<AboutUsType>;
  } else {
    console.log('No such document!');
  }
});

export const getDataGalleryFromFirestore = cache(async () => {
  const docRef = doc(db, 'content for site', 'gallery');
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data() as Promise<GalleryType>;
  } else {
    console.log('No such document!');
  }
});

export const getDataProductsServicesFromFirestore = cache(async () => {
  const docRef = doc(db, 'content for site', 'products-services');
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data() as Promise<ProductsServicesType>;
  } else {
    console.log('No such document!');
  }
});

export const getDataIntroFromFirestore = cache(async () => {
  const docRef = doc(db, 'content for site', 'intro');
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data() as Promise<IntroType>;
  } else {
    console.log('No such document!');
  }
});

export const getDataHomeProductsFromFirestore = cache(async () => {
  const docRef = doc(db, 'content for site', 'homeProducts');
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data() as Promise<HomeProductsType>;
  } else {
    console.log('No such document!');
  }
});
export const getDataHomeServicesFromFirestore = cache(async () => {
  const docRef = doc(db, 'content for site', 'homeServices');
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data() as Promise<HomeServicesType>;
  } else {
    console.log('No such document!');
  }
});
export const getAllServices = cache(async () => {
  // try {
  const services: ServiceType[] = [];
  const querySnapshot = await getDocs(collection(db, 'services'));

  querySnapshot.forEach(doc => {
    services.push({ ...doc.data() } as ServiceType);
  });

  return services;
  // } catch (error) {
  //   console.log(error);
  // }
});

// =====================================================================
export const getAllProducts = cache(async (): Promise<ProductServiceType[]> => {
  // try {
  const products: ProductServiceType[] = [];
  const querySnapshot = await getDocs(collection(db, 'products'));

  querySnapshot.forEach(doc => {
    products.push({ ...doc.data() } as ProductServiceType);
  });
  // if (products) {
  return products;
  // }
  // } catch (error) {
  //   console.log(error);
  // }
});
// =================================================================
export const getAllStaff = cache(async () => {
  try {
    const staff: StaffType[] = [];
    const querySnapshot = await getDocs(collection(db, 'staff'));

    querySnapshot.forEach(doc => {
      staff.push({ ...doc.data() } as StaffType);
    });

    return staff;
  } catch (error) {
    console.log(error);
  }
});
// ========================================================================
export const getOneProduct = cache(
  async (fieldName: string): Promise<ProductServiceType | undefined> => {
    let arrayChooseProduct: ProductServiceType[] = [];

    try {
      const q = query(
        collection(db, 'products'),
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
export const getOneService = cache(async (fieldName: string) => {
  let arrayChooseService: ServiceType[] = [];

  const q = query(collection(db, 'services'), where('nameEN', '==', fieldName));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach(doc => {
    arrayChooseService.push({ ...doc.data() } as ServiceType);
  });

  return arrayChooseService;
});
