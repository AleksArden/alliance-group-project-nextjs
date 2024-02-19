import { GalleryImageURLType } from 'types/dataTypeForFirebase';
import firebase_app from './config';
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';

const storage = getStorage(firebase_app);
// ======================================================
export const uploadImageToStorage = async (
  storageName: string,
  imageName: string,
  file: File
): Promise<string | undefined> => {
  try {
    const storageRef = ref(storage, `${storageName}/${imageName}`);

    await uploadBytes(storageRef, file);
    const imageURL = await getDownloadURL(
      ref(storage, `${storageName}/${imageName}`)
    );

    return imageURL;
  } catch (error) {
    console.log(error);
  }
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
}): Promise<string | undefined> => {
  try {
    const storageRef = ref(
      storage,
      `${nameCollection}/${productName}/${imageName}`
    );

    await uploadBytes(storageRef, file);
    const imageURL = await getDownloadURL(
      ref(storage, `${nameCollection}/${productName}/${imageName}`)
    );

    return imageURL;
  } catch (error) {
    console.log(error);
  }
};
// =============================================================
export const deleteImageFromStorage = async (
  nameCollection: string,
  productName: string,
  galleryImagesURL: GalleryImageURLType[] | undefined
): Promise<void> => {
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
): Promise<void> => {
  try {
    const desertRef = ref(
      storage,
      `${nameCollection}/${productName}/${imageName}`
    );
    await deleteObject(desertRef);
  } catch (error) {
    console.log(error);
  }
};
// ==============================================================
