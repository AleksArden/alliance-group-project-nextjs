import { Metadata } from 'next';

type RouteProps = {
  params: { locale: string };
  searchParams: { [key: string]: string | string[] | undefined };
};
export async function generateMetadata(props: RouteProps): Promise<Metadata> {
  const intl = await getIntl(props.params.locale);
  return {
    title: intl.formatMessage({ id: 'page.home.head.title' }),
    description: 'Generated by create next app',
  };
}
import {
  getAllProducts,
  getAllServices,
  getDataFromFirestore,
} from '@/firebase/getData';

import styles from './page.module.scss';

import AnimationHeroHome from 'components/animationHeroHome/AnimationHeroHome';

import BackgroundImage from 'components/backgroundImage/BackgroundImage';
import ContentHeroHome from 'components/contentHeroHome/ContentHeroHome';

import ContentHeroOtherPages from 'components/contentHeroOtherPages/ContentHeroOtherPages';
import AnimationHeroOtherPages from 'components/anomationHeroOtherPages/AnimationHeroOtherPages';
import SliderHomeProducts from 'components/sliderHomeProducts/SliderHomeProducts';
import SliderHomeServices from 'components/sliderHomeServices/SliderHomeServices';
import { Lang } from 'types/otherType';
import {
  HomePageType,
  HomeProductsType,
  HomeServicesType,
  IntroType,
} from 'types/dataTypeForFirebase';
import ClientHomePage from '../../../components/clientHomePage/ClientHomePage';
import { getIntl } from 'lib/intl';
type IProps = {
  params: { locale: string };
};
const Home = async ({ params: { locale } }: IProps) => {
  // console.log('locale-HOME-PAGE', locale);
  // const intl = await getIntl(locale);

  const data = await getDataFromFirestore<HomePageType>('home');
  // console.log('page home-page', data);
  const dataIntro = await getDataFromFirestore<IntroType>('intro');
  // console.log('intro home', dataIntro);
  const dataHomeProducts = await getDataFromFirestore<HomeProductsType>(
    'homeProducts'
  );
  // console.log('homeProducts home', dataHomeProducts);
  const listAllProducts = await getAllProducts();
  // console.log('list productsHome', listAllProducts);
  const dataHomeServices = await getDataFromFirestore<HomeServicesType>(
    'homeServices'
  );
  // console.log('homeServices home', dataHomeServices);
  const listAllServices = await getAllServices();
  // console.log('list servicesHome', listAllServices);

  return (
    <>
      <section className={styles.hero}>
        {data && (
          <>
            <BackgroundImage imageUrl={data?.backgroundImageDesktop} />
            {locale === Lang.UK && (
              <ContentHeroHome
                title={data.titleUK}
                subtitle={data.subtitleUK}
                locale={locale}
              />
            )}
            {locale === Lang.EN && (
              <ContentHeroHome
                title={data.titleEN}
                subtitle={data.subtitleEN}
                locale={locale}
              />
            )}{' '}
            {locale === Lang.TR && (
              <ContentHeroHome
                title={data.titleTR}
                subtitle={data.subtitleTR}
                locale={locale}
              />
            )}
            <AnimationHeroHome title={data.titleUK} />
          </>
        )}
      </section>

      <ClientHomePage dataIntro={dataIntro} />

      <section className={styles.products}>
        {dataHomeProducts && (
          <>
            <BackgroundImage
              imageUrl={dataHomeProducts.backgroundImageDesktop}
            />
            {locale === Lang.UK && (
              <>
                <ContentHeroOtherPages
                  title={dataHomeProducts.titleUK}
                  classTitleHome={true}
                />
                <AnimationHeroOtherPages
                  title={dataHomeProducts.titleUK}
                  top="600px"
                />
              </>
            )}
            {locale === Lang.EN && (
              <>
                <ContentHeroOtherPages
                  title={dataHomeProducts.titleEN}
                  classTitleHome={true}
                />
                <AnimationHeroOtherPages
                  title={dataHomeProducts.titleEN}
                  top="600px"
                />
              </>
            )}
            {locale === Lang.TR && (
              <>
                <ContentHeroOtherPages
                  title={dataHomeProducts.titleTR}
                  classTitleHome={true}
                />
                <AnimationHeroOtherPages
                  title={dataHomeProducts.titleTR}
                  top="600px"
                />
              </>
            )}
            {listAllProducts && (
              <SliderHomeProducts products={listAllProducts} locale={locale} />
            )}
          </>
        )}
      </section>
      <section className={styles.services}>
        {dataHomeServices && (
          <>
            <BackgroundImage
              imageUrl={dataHomeServices.backgroundImageDesktop}
            />
            {locale === Lang.UK && (
              <>
                <ContentHeroOtherPages
                  title={dataHomeServices.titleUK}
                  classTitleHome={true}
                />
                <AnimationHeroOtherPages
                  title={dataHomeServices.titleUK}
                  top="600px"
                />
              </>
            )}
            {locale === Lang.EN && (
              <>
                <ContentHeroOtherPages
                  title={dataHomeServices.titleEN}
                  classTitleHome={true}
                />
                <AnimationHeroOtherPages
                  title={dataHomeServices.titleEN}
                  top="600px"
                />
              </>
            )}
            {locale === Lang.TR && (
              <>
                <ContentHeroOtherPages
                  title={dataHomeServices.titleTR}
                  classTitleHome={true}
                />
                <AnimationHeroOtherPages
                  title={dataHomeServices.titleTR}
                  top="600px"
                />
              </>
            )}

            {listAllServices && (
              <SliderHomeServices services={listAllServices} locale={locale} />
            )}
          </>
        )}
      </section>
    </>
  );
};
export default Home;
