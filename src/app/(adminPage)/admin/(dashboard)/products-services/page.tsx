import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Admin/Products and Services | Alliance Group LLC™',
};
import styles from './ProductsServices.module.scss';
import { getDataFromFirestore } from '@/firebase/getData';
import ProductsServicesForm from './productsServicesForm/ProductsServicesForm';
import { ProductsServicesType } from 'types/dataTypeForFirebase';

const AdminProductsServices = async () => {
  const data = await getDataFromFirestore<ProductsServicesType>(
    'productsServicesPage'
  );
  // console.log('productsServices admin', data);
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Admin/Products Services</h2>
      <ProductsServicesForm data={data} />
    </div>
  );
};
export default AdminProductsServices;
