import ProductServiceItem from 'components/productServiceItem/ProductServiceItem';
import { ProductServiceType, ServiceType } from 'types/dataTypeForFirebase';

interface IProps {
  products: ProductServiceType[];
  services: ServiceType[];
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
        services.map((oneService: ServiceType) => (
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
