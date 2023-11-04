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

const Home = async () => {
  const data = await getDataHomePageFromFirestore();
  console.log('page home-page', data);
  const dataIntro = await getDataIntroFromFirestore();
  console.log('intro home', dataIntro);
  const dataHomeProducts = await getDataHomeProductsFromFirestore();
  console.log('homeProducts home', dataHomeProducts);
  const listAllProducts = await getAllProducts();
  console.log('list productsHome', listAllProducts);
  const dataHomeServices = await getDataHomeServicesFromFirestore();
  console.log('homeServices home', dataHomeServices);
  const listAllServices = await getAllServices();
  console.log('list servicesHome', listAllServices);
  return (
    <>
      <section className={styles.hero}>
        {data && (
          <>
            <BackgroundImage imageUrl={data?.backgroundImageDesktop} />

            <ContentHeroHome title={data.title} subtitle={data.subtitle} />

            <AnimationHeroHome title={data.title} />
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
            <ContentHeroOtherPages
              title={dataHomeProducts.titleUA}
              classTitleHome={true}
            />
            <AnimationHeroOtherPages
              title={dataHomeProducts.titleUA}
              initial={-1650}
              top="600px"
            />
            {listAllProducts && (
              <SliderHomeProducts products={listAllProducts} />
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
            <ContentHeroOtherPages
              title={dataHomeServices.titleUA}
              classTitleHome={true}
            />
            <AnimationHeroOtherPages
              title={dataHomeServices.titleUA}
              initial={-1350}
              top="600px"
            />
            {listAllServices && (
              <SliderHomeServices services={listAllServices} />
            )}
          </>
        )}
      </section>
    </>
  );
};
export default Home;
