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

export const useUploadImageFileWithName = () => {
  const [blobImagesURL, setBlobImagesURL] = useState<string[]>([]);
  const [name, setName] = useState('');

  const handleSelectFileWithName = (files: FileList | null, name: string) => {
    if (files !== null) {
      const selectedFilesArray = Array.from(files);

      const imagesURLArray = selectedFilesArray.map(file => {
        return URL.createObjectURL(file);
      });
      setBlobImagesURL([...blobImagesURL, imagesURLArray[0]]);
      setName(name);
    }
  };

  return { blobImagesURL, name, handleSelectFileWithName };
};
