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

export const uploadImageToStorageWithNameEN = async (
  storageName: string,
  nameEN: string,
  imageName: string,
  file: File
) => {
  const storageRef = ref(storage, `${storageName}/${nameEN}/${imageName}`);

  await uploadBytes(storageRef, file);
  const imageURL = await getDownloadURL(
    ref(storage, `${storageName}/${nameEN}/${imageName}`)
  );

  return imageURL;
};

export const deleteImageFromStorage = async (
  nameCollection: string,
  productName: string
) => {
  try {
    const desertRef = ref(storage, `${nameCollection}/${productName}/imageURL`);
    await deleteObject(desertRef);
    const desertRef1 = ref(storage, `${nameCollection}/${productName}/1`);
    await deleteObject(desertRef1);
  } catch (error) {
    console.log(error);
  }
};

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
