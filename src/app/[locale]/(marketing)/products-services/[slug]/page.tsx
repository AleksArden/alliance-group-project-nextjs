import { Metadata, ResolvingMetadata } from 'next';

type RouteProps = {
  params: { locale: string; slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};
export async function generateMetadata(props: RouteProps): Promise<
  | {
      title: string;
      description: string;
    }
  | undefined
> {
  const productName = getProductServiceName(props.params.slug);
  const locale = props.params.locale;

  const product = await getOneProduct(productName);
  const service = await getOneService(productName);

  if (product) {
    switch (locale) {
      case Lang.UK:
        return {
          title: ` ${product?.nameUK} | TOB Alliance Group LLC™`,
          description: 'Generated by create next app',
        };
      case Lang.TR:
        return {
          title: ` ${product?.nameTR} | TOB Alliance Group LLC™`,
          description: 'Generated by create next app',
        };
      default:
        return {
          title: ` ${productName} | TOB Alliance Group LLC™`,
          description: 'Generated by create next app',
        };
    }
  }
  if (service) {
    switch (locale) {
      case Lang.UK:
        return {
          title: ` ${service?.nameUK} | TOB Alliance Group LLC™`,
          description: 'Generated by create next app',
        };
      case Lang.TR:
        return {
          title: ` ${service?.nameTR} | TOB Alliance Group LLC™`,
          description: 'Generated by create next app',
        };
      default:
        return {
          title: ` ${productName} | TOB Alliance Group LLC™`,
          description: 'Generated by create next app',
        };
    }
  }
}

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
import { getIntl } from 'lib/intl';
import { ProductServiceType } from 'types/dataTypeForFirebase';

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

  return (
    <>
      <HeroSection
        backgroundImage={
          product
            ? {
                desktop: product.imageURL,
                tablet: product.imageURL,
                mobile: product.imageURL,
              }
            : {
                desktop: service?.imageURL,
                tablet: service?.imageURL,
                mobile: service?.imageURL,
              }
        }
        title={
          product
            ? locale === Lang.UK
              ? product.nameUK
              : undefined || locale === Lang.EN
              ? product.nameEN
              : undefined || locale === Lang.TR
              ? product.nameTR
              : undefined
            : locale === Lang.UK
            ? service?.nameUK
            : undefined || locale === Lang.EN
            ? service?.nameEN
            : undefined || locale === Lang.TR
            ? service?.nameTR
            : undefined
        }
      />

      <section className={styles.section}>
        <div className={styles.container}>
          {locale === Lang.UK && product && (
            <>
              <p
                className={
                  product.sizeUK ? styles.name : styles.nameWithoutSize
                }
              >
                {product.nameUK}
              </p>

              {product.sizeUK && (
                <p className={styles.size}>{product.sizeUK}</p>
              )}
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
                className={
                  product.sizeEN ? styles.name : styles.nameWithoutSize
                }
              >
                {product.nameEN}
              </p>

              {product.sizeEN && (
                <p className={styles.size}>{product.sizeEN}</p>
              )}
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
                className={
                  product.sizeTR ? styles.name : styles.nameWithoutSize
                }
              >
                {product.nameTR}
              </p>

              {product.sizeTR && (
                <p className={styles.size}>{product.sizeTR}</p>
              )}
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
                  slug={slug}
                />
              ))}
            </ul>
          )}
          {service && service?.galleryImagesURL.length > 0 && (
            <ul className={styles.list}>
              {service.galleryImagesURL.map(image => (
                <ProductServiceImage
                  key={image.imageName}
                  props={image}
                  locale={locale}
                  slug={slug}
                />
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
};
export default ProductCard;
