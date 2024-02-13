import { Metadata } from 'next';

type RouteProps = {
  params: { locale: string };
  searchParams: { [key: string]: string | string[] | undefined };
};
export async function generateMetadata(props: RouteProps): Promise<Metadata> {
  const intl = await getIntl(props.params.locale);

  return {
    title: intl.formatMessage({ id: 'page.productsServices.head.title' }),
    description: 'Generated by create next app',
  };
}
import styles from './ProductsServices.module.scss';
import {
  getAllProducts,
  getAllServices,
  getDataFromFirestore,
} from '@/firebase/getData';
import HeroSection from 'components/heroSection/HeroSection';
import Content from 'components/content/Content';

import ProductsServicesList from 'components/productsServicesList/ProductsServicesList';
import { Lang } from 'types/otherType';
import { ProductsServicesType } from 'types/dataTypeForFirebase';
import { getIntl } from 'lib/intl';

type IProps = {
  params: { locale: string };
};

const ProductsServices = async ({ params: { locale } }: IProps) => {
  const data = await getDataFromFirestore<ProductsServicesType>(
    'products-services'
  );
  console.log('page products-services', data);
  const listAllProducts = await getAllProducts();
  // console.log('Page ProductsServices', listAllProducts);
  const listAllServices = await getAllServices();
  // console.log('Page ProductsServices', listAllServices);

  return (
    <>
      <HeroSection
        backgroundImage={{
          desktop: data?.backgroundImageDesktop,
          tablet: data?.backgroundImageTablet,
          mobile: data?.backgroundImageMobile,
        }}
        title={
          locale === Lang.UK
            ? data?.titleUK
            : undefined || locale === Lang.EN
            ? data?.titleEN
            : undefined || locale === Lang.TR
            ? data?.titleTR
            : undefined
        }
        subtitle={
          locale === Lang.UK
            ? data?.subtitleUK
            : undefined || locale === Lang.EN
            ? data?.subtitleEN
            : undefined || locale === Lang.TR
            ? data?.subtitleTR
            : undefined
        }
      />

      <section className={styles.section}>
        <div className={styles.container}>
          {data?.textUK && locale === Lang.UK && (
            <div className={styles.contentWrapper}>
              <Content content={data?.textUK} />
            </div>
          )}
          {data?.textEN && locale === Lang.EN && (
            <div className={styles.contentWrapper}>
              <Content content={data?.textEN} />
            </div>
          )}
          {data?.textTR && locale === Lang.TR && (
            <div className={styles.contentWrapper}>
              <Content content={data?.textTR} />
            </div>
          )}

          <ProductsServicesList
            products={listAllProducts}
            services={listAllServices}
            locale={locale}
          />
        </div>
      </section>
    </>
  );
};
export default ProductsServices;
