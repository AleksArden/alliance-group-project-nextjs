import { getOneProduct, getOneService } from '@/firebase/getData';
import { getFieldName } from 'helpers/functions';

interface IProps {
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
