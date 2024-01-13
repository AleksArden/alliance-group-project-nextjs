import { useState } from 'react';

export const useUploadImageFile = (): {
  blobImageURL: string;
  handleSelectFile: (files: FileList | null) => void;
} => {
  const [blobImageURL, setBlobImageURL] = useState('');

  const handleSelectFile = (files: FileList | null): void => {
    if (files !== null) {
      const selectedFilesArray = Array.from(files);

      const imagesURLArray = selectedFilesArray.map(file => {
        return URL.createObjectURL(file);
      });
      setBlobImageURL(imagesURLArray[0]);
    }
  };

  return { blobImageURL, handleSelectFile };
};

//=============================================================
export const useUploadArrayImagesFile = (): {
  blobGalleryImageURL: string;
  handleSelectArrayFile: (files: FileList | null) => void;
} => {
  const [blobGalleryImageURL, setGalleryBlobImageURL] = useState('');

  const handleSelectArrayFile = (files: FileList | null): void => {
    if (files !== null) {
      const selectedFilesArray = Array.from(files);

      const imagesURLArray = selectedFilesArray.map(file => {
        return URL.createObjectURL(file);
      });
      setGalleryBlobImageURL(imagesURLArray[0]);
    }
  };

  return { blobGalleryImageURL, handleSelectArrayFile };
};
// ====================================================================
