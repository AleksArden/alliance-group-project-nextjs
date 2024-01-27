import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Admin/Gallery | Alliance Group LLC™',
};

import styles from './Gallery.module.scss';
import GalleryForm from './galleryForm/GalleryForm';
import { getDataFromFirestore } from '@/firebase/getData';
import { GalleryType } from 'types/dataTypeForFirebase';

const AdminGallery = async () => {
  const data = await getDataFromFirestore<GalleryType>('gallery');
  // console.log('gallery admin', data);
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Admin/Gallery</h2>
      <GalleryForm data={data} />
    </div>
  );
};
export default AdminGallery;
