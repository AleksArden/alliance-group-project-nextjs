import {
  getAllProducts,
  getAllServices,
  getOneProduct,
  getOneService,
} from '@/firebase/getData';
import { getFieldName } from 'helpers/functions';

export async function generateStaticParams() {
  const listAllProducts = await getAllProducts();
  // const listAllServices = await getAllServices();

  let productServiceCards: string[] = [];

  listAllProducts?.forEach(({ nameEN }) => {
    productServiceCards.push(nameEN);
  });
  // listAllServices?.forEach(({ nameEN }) => {
  //   productServiceCards.push(nameEN);
  // });

  return productServiceCards.map((nameEN: string) => ({
    slug: nameEN,
  }));
}

// export async function generateStaticParams() {
//   const listAllProducts = await getAllProducts();

//   return listAllProducts?.map(product => ({
//     slug: product.nameEN,
//   }));
// }
interface IProps {
  params: { slug: string };
}

const ProductServiceCard = async ({ params: { slug } }: IProps) => {
  const fieldName = getFieldName(slug);
  console.log('fieldName', fieldName);
  const [product] = await getOneProduct(fieldName);
  console.log('product', product);
  return (
    <>
      <div> My post:{product.descriptionUK} </div>
    </>
  );
};
export default ProductServiceCard;
