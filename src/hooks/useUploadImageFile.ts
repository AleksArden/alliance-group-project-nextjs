import { useState } from 'react';

export const useUploadImageFile = () => {
  const [blobImageURL, setBlobImageURL] = useState('');

  const handleSelectFile = (files: FileList | null) => {
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
