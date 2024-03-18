import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Admin/Products and Services | Alliance Group LLC™',
};

import { getDataFromFirestore } from '@/firebase/getData';
import { ProductsServicesType } from 'types/dataTypeForFirebase';
import AdminProductsServices from './ProductsServices';

const AdminProductsServicesPage = async () => {
  const data = await getDataFromFirestore<ProductsServicesType>(
    'productsServicesPage'
  );
  // console.log('productsServices admin', data);
  return <> {data && <AdminProductsServices data={data} />}</>;
};
export default AdminProductsServicesPage;
