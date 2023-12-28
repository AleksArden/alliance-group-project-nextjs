import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Products-Services | Alliance Group LLC',
  description: 'Generated by create next app',
};
import styles from './ProductsServices.module.scss';
import {
  getAllProducts,
  getDataProductsServicesFromFirestore,
} from '@/firebase/getData';
import HeroSection from 'components/heroSection/HeroSection';
import Content from 'components/content/Content';
import { ProductType } from 'types/dataTypeForFirebase';

type IProps = {
  params: { locale: string };
};

const ProductsServices = async ({ params: { locale } }: IProps) => {
  const data = await getDataProductsServicesFromFirestore();
  // console.log('page products-services', data);
  const listAllProducts = await getAllProducts();
  // console.log('Page ProductsServices', listAllProducts);
  return (
    <>
      {locale === 'uk' && (
        <HeroSection
          backgroundImage={data?.backgroundImageDesktop}
          title={data?.titleUK}
          subtitle={data?.subtitleUK}
          initialAnimation={-3600}
        />
      )}
      {locale === 'en' && (
        <HeroSection
          backgroundImage={data?.backgroundImageDesktop}
          title={data?.titleEN}
          subtitle={data?.subtitleEN}
          initialAnimation={-3500}
        />
      )}
      {locale === 'tr' && (
        <HeroSection
          backgroundImage={data?.backgroundImageDesktop}
          title={data?.titleTR}
          subtitle={data?.subtitleTR}
          initialAnimation={-2850}
        />
      )}
      <section className={styles.container}>
        {data?.textUK && locale === 'uk' && <Content content={data?.textUK} />}
        {data?.textEN && locale === 'en' && <Content content={data?.textEN} />}
        {data?.textTR && locale === 'tr' && <Content content={data?.textTR} />}
      </section>
      <section className={styles.container}>
        <ul>
          {listAllProducts &&
            listAllProducts.map((oneProduct: ProductType) => (
              <li key={oneProduct.id}></li>
            ))}
        </ul>
      </section>
    </>
  );
};
export default ProductsServices;
