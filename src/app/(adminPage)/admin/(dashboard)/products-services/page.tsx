import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Admin/Products-Services us | Alliance Group',
};
import styles from './ProductsServices.module.scss';
import { getDataProductsServicesFromFirestore } from '@/firebase/getData';
import ProductsServicesForm from './productsServicesForm/ProductsServicesForm';

const AdminProductsServices = async () => {
  const data = await getDataProductsServicesFromFirestore();
  // console.log('productsServices admin', data);
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Admin/Products Services</h2>
      <ProductsServicesForm data={data} />
    </div>
  );
};
export default AdminProductsServices;
