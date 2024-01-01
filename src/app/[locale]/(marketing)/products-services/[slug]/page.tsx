import {
  getAllProducts,
  getAllServices,
  getOneProduct,
  getOneService,
} from '@/firebase/getData';
import { getNameForAdressBar, getPrtoductServiceName } from 'helpers/functions';

// export async function generateStaticParams() {
//   const products = await getAllProducts();

//   return products.map(product => ({
//     slug: getNameForAdressBar(product.nameEN),
//   }));
// }

export async function generateStaticParams() {
  let productsServices: string[] = [];

  const products = await getAllProducts();
  const services = await getAllServices();

  products.forEach(({ nameEN }) => productsServices.push(nameEN));
  services.forEach(({ nameEN }) => productsServices.push(nameEN));

  return productsServices.map(nameEN => ({
    slug: getNameForAdressBar(nameEN),
  }));
}

export const dynamicParams = true;

export interface IProps {
  params: { slug: string };
}

const ProductCard = async ({ params: { slug } }: IProps) => {
  const productName = getPrtoductServiceName(slug);
  const [product] = await getOneProduct(productName);
  const [service] = await getOneService(productName);

  return (
    <>
      {product && (
        <div>
          My product:{slug} {productName} {product.nameEN}
        </div>
      )}

      {service && (
        <div>
          My product:{slug} {productName} {service.nameEN}
        </div>
      )}
    </>
  );
};
export default ProductCard;
