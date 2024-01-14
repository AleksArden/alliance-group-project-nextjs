import { GalleryImageURLType } from 'types/dataTypeForFirebase';
import firebase_app from './config';
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  uploadBytesResumable,
  deleteObject,
} from 'firebase/storage';

const storage = getStorage(firebase_app);
// ======================================================
export const uploadImageToStorage = async (
  storageName: string,
  imageName: string,
  file: File
) => {
  const storageRef = ref(storage, `${storageName}/${imageName}`);

  await uploadBytes(storageRef, file);
  const imageURL = await getDownloadURL(
    ref(storage, `${storageName}/${imageName}`)
  );

  return imageURL;
};
// ==================================================================
export const uploadImageToStorageWithNameEN = async ({
  nameCollection,
  productName,
  imageName,
  file,
}: {
  nameCollection: string;
  productName: string;
  imageName: string;
  file: File;
}): Promise<string> => {
  const storageRef = ref(
    storage,
    `${nameCollection}/${productName}/${imageName}`
  );

  await uploadBytes(storageRef, file);
  const imageURL = await getDownloadURL(
    ref(storage, `${nameCollection}/${productName}/${imageName}`)
  );

  return imageURL;
};
// =============================================================
export const deleteImageFromStorage = async (
  nameCollection: string,
  productName: string,
  galleryImagesURL: GalleryImageURLType[] | undefined
) => {
  try {
    const desertRef = ref(storage, `${nameCollection}/${productName}/imageURL`);
    await deleteObject(desertRef);
    if (galleryImagesURL !== undefined && galleryImagesURL.length > 0) {
      galleryImagesURL.forEach(async ({ imageName }) => {
        const desertRefImageName = ref(
          storage,
          `${nameCollection}/${productName}/${imageName}`
        );
        await deleteObject(desertRefImageName);
      });
    }
  } catch (error) {
    console.log(error);
  }
};
// ===============================================================
export const deleteGalleryImageFromStorage = async (
  nameCollection: string,
  productName: string,
  imageName: string
) => {
  const desertRef = ref(
    storage,
    `${nameCollection}/${productName}/${imageName}`
  );
  await deleteObject(desertRef);
};
// ==============================================================
export const getProgressUpload = async (
  storageName: string,
  imageName: string,
  file: File
) => {
  const storageRef = ref(storage, `${storageName}/${imageName}`);

  const uploadTask = uploadBytesResumable(storageRef, file);
  uploadTask.on(
    'state_changed',
    snapshot => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
    },
    error => {
      switch (error.code) {
        case 'storage/unauthorized':
          break;
        case 'storage/canceled':
          break;
        case 'storage/unknown':
          break;
      }
    },
    async () => {
      const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
      console.log('File available at', downloadURL);
    }
  );
};
