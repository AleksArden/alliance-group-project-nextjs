import {
  getAllProducts,
  getAllServices,
  getOneProduct,
  getOneService,
} from '@/firebase/getData';
import { getNameForAdressBar, getProductServiceName } from 'helpers/functions';

import styles from './ProductCard.module.scss';
import { Lang } from 'types/otherType';
import HeroSection from 'components/heroSection/HeroSection';
import Content from 'components/content/Content';

export async function generateStaticParams() {
  let productsServices: string[] = [];

  const products = await getAllProducts();
  const services = await getAllServices();

  products?.forEach(({ nameEN }) => productsServices.push(nameEN));
  services?.forEach(({ nameEN }) => productsServices.push(nameEN));

  return productsServices.map(nameEN => ({
    slug: getNameForAdressBar(nameEN),
  }));
}

export const dynamicParams = true;

export interface IProps {
  params: { slug: string; locale: string };
}

const ProductCard = async ({ params: { slug, locale } }: IProps) => {
  const productName = getProductServiceName(slug);
  const product = await getOneProduct(productName);
  const service = await getOneService(productName);
  // console.log('slug', slug);
  // console.log('productName', productName);
  // console.log('product', product);
  // console.log('service', service);

  return (
    <>
      {locale === Lang.UK && (
        <HeroSection
          backgroundImage={product ? product.imageURL : service?.imageURL}
          title={product ? product.nameUK : service?.nameUK}
          // subtitle={product?.sizeUK}
          initialAnimation={-1050}
        />
      )}
      {locale === Lang.EN && (
        <HeroSection
          backgroundImage={product ? product.imageURL : service?.imageURL}
          title={product ? product.nameEN : service?.nameEN}
          initialAnimation={-900}
        />
      )}
      {locale === Lang.TR && (
        <HeroSection
          backgroundImage={product ? product.imageURL : service?.imageURL}
          title={product ? product.nameTR : service?.nameTR}
          initialAnimation={-1390}
        />
      )}
      <section className={styles.container}>
        {locale === Lang.UK && product && (
          <div className={styles.contentWrapper}>
            <Content content={product.descriptionUK} />
          </div>
        )}
        {locale === Lang.UK && service && (
          <div className={styles.contentWrapper}>
            <Content content={service.descriptionUK} />
          </div>
        )}
        {locale === Lang.EN && product && (
          <div className={styles.contentWrapper}>
            <Content content={product.descriptionEN} />
          </div>
        )}
        {locale === Lang.EN && service && (
          <div className={styles.contentWrapper}>
            <Content content={service.descriptionEN} />
          </div>
        )}
        {locale === Lang.TR && product && (
          <div className={styles.contentWrapper}>
            <Content content={product.descriptionTR} />
          </div>
        )}
        {locale === Lang.TR && service && (
          <div className={styles.contentWrapper}>
            <Content content={service.descriptionTR} />
          </div>
        )}
      </section>
    </>
  );
};
export default ProductCard;
