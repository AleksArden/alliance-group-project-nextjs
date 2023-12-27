import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Admin/Gallery | Alliance Group',
};

import styles from './Gallery.module.scss';
import GalleryForm from './galleryForm/GalleryForm';
import { getDataGalleryFromFirestore } from '@/firebase/getData';

const AdminGallery = async () => {
  const data = await getDataGalleryFromFirestore();
  // console.log('gallery admin', data);
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Admin/Gallery</h2>
      <GalleryForm data={data} />
    </div>
  );
};
export default AdminGallery;
