import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import firebase_app from '@/firebase/config';
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from 'firebase/storage';
import { ServiceType } from 'types/dataTypeForFirebase';

const storage = getStorage(firebase_app);

export const useUploadImageFile = (
  data: ServiceType | undefined,

  imageName: string
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [downloadURL, setDownloadURL] = useState('');
  const [fileName, setFileName] = useState('');

  const getImageURL = (files: FileList | null) => {
    if (files !== null && files !== undefined) {
      const file = files[0];

      if (!data) {
        const name = uuidv4();

        setFileName(name);
        const storageRef = ref(storage, `services/${name}`);

        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
          'state_changed',
          snapshot => {
            if (snapshot.state === 'running') setIsLoading(true);
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
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
              console.log('File available at', downloadURL);
              setDownloadURL(downloadURL);
              setIsLoading(false);
            });
          }
        );
      } else {
        const storageRef = ref(storage, `services/${imageName}`);
        setFileName(imageName);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
          'state_changed',
          snapshot => {
            if (snapshot.state === 'running') setIsLoading(true);
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
            getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
              console.log('File available at', downloadURL);
              setDownloadURL(downloadURL);
              setIsLoading(false);
            });
          }
        );
      }
    }
  };

  return { isLoading, downloadURL, fileName, getImageURL };
};
