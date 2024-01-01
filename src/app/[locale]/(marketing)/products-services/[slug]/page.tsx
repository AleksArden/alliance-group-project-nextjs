import {
  getAllProducts,
  getOneProduct,
  getOneService,
} from '@/firebase/getData';
import { getFieldName } from 'helpers/functions';

export async function generateStaticParams() {
  const products = await getAllProducts();

  if (products) {
    return products.map(product => ({
      slug: product.nameEN,
    }));
  }
}

export interface IProps {
  params: { slug: string };
}

const ProductServiceCard = async ({ params: { slug } }: IProps) => {
  const fieldName = getFieldName(slug);
  const [product] = await getOneProduct(fieldName);
  const [service] = await getOneService(fieldName);

  return (
    <>
      {product ? (
        <div>My product: {product.descriptionUK}</div>
      ) : (
        <div>My product: {service.descriptionUK}</div>
      )}
    </>
  );
};
export default ProductServiceCard;
