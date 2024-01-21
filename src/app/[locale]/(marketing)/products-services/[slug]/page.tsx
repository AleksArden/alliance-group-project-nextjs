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
import ProductServiceImage from 'components/productServiceImage/ProductServiceImage';

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
          <>
            <p
              className={product.sizeUK ? styles.name : styles.nameWithoutSize}
            >
              {product.nameUK}
            </p>

            {product.sizeUK && <p className={styles.size}>{product.sizeUK}</p>}
            <div className={styles.textContainer}>
              <Content content={product.descriptionUK} />
            </div>
          </>
        )}
        {locale === Lang.UK && service && (
          <>
            <p className={styles.nameWithoutSize}>{service.nameUK}</p>

            <div className={styles.textContainer}>
              <Content content={service.descriptionUK} />
            </div>
          </>
        )}
        {locale === Lang.EN && product && (
          <>
            <p
              className={product.sizeEN ? styles.name : styles.nameWithoutSize}
            >
              {product.nameEN}
            </p>

            {product.sizeEN && <p className={styles.size}>{product.sizeEN}</p>}
            <div className={styles.textContainer}>
              <Content content={product.descriptionEN} />
            </div>
          </>
        )}
        {locale === Lang.EN && service && (
          <>
            <p className={styles.nameWithoutSize}>{service.nameEN}</p>

            <div className={styles.textContainer}>
              <Content content={service.descriptionEN} />
            </div>
          </>
        )}
        {locale === Lang.TR && product && (
          <>
            <p
              className={product.sizeTR ? styles.name : styles.nameWithoutSize}
            >
              {product.nameTR}
            </p>

            {product.sizeTR && <p className={styles.size}>{product.sizeTR}</p>}
            <div className={styles.textContainer}>
              <Content content={product.descriptionTR} />
            </div>
          </>
        )}
        {locale === Lang.TR && service && (
          <>
            <p className={styles.nameWithoutSize}>{service.nameTR}</p>

            <div className={styles.textContainer}>
              <Content content={service.descriptionTR} />
            </div>
          </>
        )}
        {product && product?.galleryImagesURL.length > 0 && (
          <ul className={styles.list}>
            {product.galleryImagesURL.map(image => (
              <ProductServiceImage
                key={image.imageName}
                props={image}
                locale={locale}
              />
            ))}
          </ul>
        )}
      </section>
    </>
  );
};
export default ProductCard;
