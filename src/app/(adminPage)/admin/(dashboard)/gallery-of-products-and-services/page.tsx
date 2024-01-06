import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin/Gallery of products and services | Alliance Group',
};
import styles from './AdminGalleryProductsServices.module.scss';
import { getAllProducts } from '@/firebase/getData';
import AdminFormGalleryProductsServices from './adminFormGalleryProductsServices/AdminFormGalleryProductsServices';

const AdminGalleryProductsServices = async () => {
  const listAllProducts = await getAllProducts();
  // console.log('adminGallery products', listAllProducts);
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Admin/Gallery of products and services</h2>
      <ul>
        {listAllProducts &&
          listAllProducts.map(oneProduct => (
            <AdminFormGalleryProductsServices
              key={oneProduct.id}
              data={oneProduct}
            />
          ))}
      </ul>
    </div>
  );
};
export default AdminGalleryProductsServices;
