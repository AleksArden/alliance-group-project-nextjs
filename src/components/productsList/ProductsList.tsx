import ProductServiceItem from 'components/productServiceItem/ProductServiceItem';
import ProductItem from 'components/productServiceItem/ProductServiceItem';
import { ProductType, ServiceType } from 'types/dataTypeForFirebase';

interface IProps {
  products: ProductType[];
  services: ServiceType[];
  locale: string;
}

const ProductsList = ({ products, services, locale }: IProps) => {
  return (
    <ul>
      {products &&
        products.map((oneProduct: ProductType) => (
          <ProductItem
            key={oneProduct.id}
            product={oneProduct}
            locale={locale}
          />
        ))}
      {services &&
        services.map((oneService: ServiceType) => (
          <ProductItem
            key={oneService.id}
            product={oneService}
            locale={locale}
          />
        ))}
    </ul>
  );
};
export default ProductsList;
