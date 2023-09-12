import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Admin/Gallery | Alliance Group',
};

import styles from './Gallery.module.scss';
import GalleryForm from './galleryForm/GalleryForm';

const AdminGallery = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Admin/Gallery</h2> <GalleryForm />
    </div>
  );
};
export default AdminGallery;
