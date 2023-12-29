import ProductServiceItem from 'components/productServiceItem/ProductServiceItem';
import ProductItem from 'components/productServiceItem/ProductServiceItem';
import { ProductType, ServiceType } from 'types/dataTypeForFirebase';

interface IProps {
  products: ProductType[] | undefined;
  services: ServiceType[] | undefined;
  locale: string;
}

const ProductsServicesList = ({ products, services, locale }: IProps) => {
  return (
    <ul>
      {products &&
        products.map((oneProduct: ProductType) => (
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
