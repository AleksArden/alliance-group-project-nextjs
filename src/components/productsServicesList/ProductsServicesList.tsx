import ProductServiceItem from 'components/productServiceItem/ProductServiceItem';
import { ProductServiceType } from 'types/dataTypeForFirebase';

interface IProps {
  products: ProductServiceType[];
  services: ProductServiceType[];
  locale: string;
}

const ProductsServicesList = ({ products, services, locale }: IProps) => {
  return (
    <ul>
      {products &&
        products.map(oneProduct => (
          <ProductServiceItem
            key={oneProduct.id}
            product={oneProduct}
            locale={locale}
          />
        ))}
      {services &&
        services.map(oneService => (
          <ProductServiceItem
            key={oneService.id}
            product={oneService}
            locale={locale}
          />
        ))}
    </ul>
  );
};
export default ProductsServicesList;
