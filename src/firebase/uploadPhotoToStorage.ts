import firebase_app from './config';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const storage = getStorage(firebase_app);

export const uploadPhotoToStorage = async (
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
