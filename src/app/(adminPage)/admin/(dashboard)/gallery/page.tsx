import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Admin/Gallery | Alliance Group LLC™',
};

import { getDataFromFirestore } from '@/firebase/getData';
import { GalleryType } from 'types/dataTypeForFirebase';
import AdminGallery from './Gallery';

const AdminGalleryPage = async () => {
  const data = await getDataFromFirestore<GalleryType>('galleryPage');
  // console.log('gallery admin', data);
  return <> {data && <AdminGallery data={data} />}</>;
};
export default AdminGalleryPage;
