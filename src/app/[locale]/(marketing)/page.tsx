import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Main | Alliance Group LLC',
  description: 'Generated by create next app',
};
import {
  getAllProducts,
  getAllServices,
  getDataHomePageFromFirestore,
  getDataHomeProductsFromFirestore,
  getDataHomeServicesFromFirestore,
  getDataIntroFromFirestore,
} from '@/firebase/getData';

import styles from './page.module.scss';

import AnimationHeroHome from 'components/animationHeroHome/AnimationHeroHome';

import BackgroundImage from 'components/backgroundImage/BackgroundImage';
import ContentHeroHome from 'components/contentHeroHome/ContentHeroHome';
import AnimationIntro from 'components/animationIntro/AnimationIntro';
import Typewriter from 'components/typewriter/Typewriter';
import ContentHeroOtherPages from 'components/contentHeroOtherPages/ContentHeroOtherPages';
import AnimationHeroOtherPages from 'components/anomationHeroOtherPages/AnimationHeroOtherPages';
import SliderHomeProducts from 'components/sliderHomeProducts/SliderHomeProducts';
import SliderHomeServices from 'components/sliderHomeServices/SliderHomeServices';
type IProps = {
  params: { locale: string };
};
const Home = async ({ params: { locale } }: IProps) => {
  console.log('locale-HOME-PAGE', locale);
  // const intl = await getIntl(locale);

  const data = await getDataHomePageFromFirestore();
  // console.log('page home-page', data);
  const dataIntro = await getDataIntroFromFirestore();
  // console.log('intro home', dataIntro);
  const dataHomeProducts = await getDataHomeProductsFromFirestore();
  // console.log('homeProducts home', dataHomeProducts);
  const listAllProducts = await getAllProducts();
  // console.log('list productsHome', listAllProducts);
  const dataHomeServices = await getDataHomeServicesFromFirestore();
  // console.log('homeServices home', dataHomeServices);
  const listAllServices = await getAllServices();
  console.log('list servicesHome', listAllServices);
  return (
    <>
      <section className={styles.hero}>
        {data && (
          <>
            <BackgroundImage imageUrl={data?.backgroundImageDesktop} />
            {locale === 'uk' && (
              <ContentHeroHome
                title={data.titleUK}
                subtitle={data.subtitleUK}
                locale={locale}
              />
            )}
            {locale === 'en' && (
              <ContentHeroHome
                title={data.titleEN}
                subtitle={data.subtitleEN}
                locale={locale}
              />
            )}{' '}
            {locale === 'tr' && (
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

      <section className={styles.intro}>
        {dataIntro && (
          <>
            <BackgroundImage imageUrl={dataIntro.backgroundImageDesktop} />
            <AnimationIntro
              text={dataIntro.text}
              sign={dataIntro.sign}
              initial={-2000}
            />
            {/* <div className={styles.container}>
              <Typewriter text={dataIntro.text} speed={25} />
              <p className={styles.sign}>{dataIntro.sign}</p>
            </div> */}
          </>
        )}
      </section>
      <section className={styles.products}>
        {dataHomeProducts && (
          <>
            <BackgroundImage
              imageUrl={dataHomeProducts.backgroundImageDesktop}
            />
            {locale === 'uk' && (
              <>
                <ContentHeroOtherPages
                  title={dataHomeProducts.titleUK}
                  classTitleHome={true}
                />
                <AnimationHeroOtherPages
                  title={dataHomeProducts.titleUK}
                  initial={-1650}
                  top="600px"
                />
              </>
            )}
            {locale === 'en' && (
              <>
                <ContentHeroOtherPages
                  title={dataHomeProducts.titleEN}
                  classTitleHome={true}
                />
                <AnimationHeroOtherPages
                  title={dataHomeProducts.titleEN}
                  initial={-1300}
                  top="600px"
                />
              </>
            )}
            {locale === 'tr' && (
              <>
                {' '}
                <ContentHeroOtherPages
                  title={dataHomeProducts.titleTR}
                  classTitleHome={true}
                />
                <AnimationHeroOtherPages
                  title={dataHomeProducts.titleTR}
                  initial={-740}
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
            {locale === 'uk' && (
              <>
                <ContentHeroOtherPages
                  title={dataHomeServices.titleUK}
                  classTitleHome={true}
                />
                <AnimationHeroOtherPages
                  title={dataHomeServices.titleUK}
                  initial={-1350}
                  top="600px"
                />
              </>
            )}
            {locale === 'en' && (
              <>
                <ContentHeroOtherPages
                  title={dataHomeServices.titleEN}
                  classTitleHome={true}
                />
                <AnimationHeroOtherPages
                  title={dataHomeServices.titleEN}
                  initial={-1300}
                  top="600px"
                />
              </>
            )}
            {locale === 'tr' && (
              <>
                <ContentHeroOtherPages
                  title={dataHomeServices.titleTR}
                  classTitleHome={true}
                />
                <AnimationHeroOtherPages
                  title={dataHomeServices.titleTR}
                  initial={-1570}
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
