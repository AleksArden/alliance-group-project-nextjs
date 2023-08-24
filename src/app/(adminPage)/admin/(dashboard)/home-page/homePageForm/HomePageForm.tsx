'use client';
import { uploadPhotoToStorage } from '@/firebase/uploadPhotoToStorage';
import { useState } from 'react';

const HomePageForm = () => {
  const [imageURL, setImageURL] = useState('');
  const handleChangePreview = async (
    evt: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (evt.target.files !== null) {
      const file = evt.target.files[0];
      const imageURL = await uploadPhotoToStorage(
        'home-page',
        'background image desktop',
        file
      );
      setImageURL(imageURL);
    }
  };
  return (
    <form>
      <label>
        Image desktop
        <input
          type="file"
          name="file"
          accept=".jpg, .jpeg, .png"
          onChange={handleChangePreview}
        />
      </label>
    </form>
  );
};
export default HomePageForm;
