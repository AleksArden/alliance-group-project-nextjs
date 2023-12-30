// import { getAllProducts } from '@/firebase/getData';

// export async function generateStaticParams() {
//   const listAllProducts = await getAllProducts();

//   return listAllProducts?.map(oneProduct => ({
//     slug: oneProduct.slug,
//   }));
// }
interface IProps {
  params: { slug: string };
}

const ProductServiceCard = ({ params: { slug } }: IProps) => {
  return <div> My post: {slug} </div>;
};
export default ProductServiceCard;
