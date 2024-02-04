'use client';

import styles from './ClientHomePage.module.scss';
import {
  HomePageType,
  HomeProductsType,
  HomeServicesType,
  IntroType,
  ProductServiceType,
} from 'types/dataTypeForFirebase';
import BackgroundImage from 'components/backgroundImage/BackgroundImage';
import AnimationIntro from 'components/animationIntro/AnimationIntro';
import { Lang } from 'types/otherType';
import ContentHeroHome from 'components/contentHeroHome/ContentHeroHome';
import AnimationHeroHome from 'components/animationHeroHome/AnimationHeroHome';

import { useIsWideScreen } from 'hooks/useIsWideScreen';
import ContentHeroOtherPages from 'components/contentHeroOtherPages/ContentHeroOtherPages';
import AnimationHeroOtherPages from 'components/anomationHeroOtherPages/AnimationHeroOtherPages';
import SliderHomeProducts from 'components/sliderHomeProducts/SliderHomeProducts';
import SliderHomeServices from 'components/sliderHomeServices/SliderHomeServices';
import HeaderMenu from 'components/headerMenu/HeaderMenu';

interface IProps {
  props: {
    dataHero: HomePageType | undefined;
    dataIntro: IntroType | undefined;
    dataHomeProducts: HomeProductsType | undefined;
    listAllProducts: ProductServiceType[] | undefined;
    dataHomeServices: HomeServicesType | undefined;
    listAllServices: ProductServiceType[] | undefined;
    locale: string;
  };
}

const ClientHomePage = ({ props }: IProps) => {
  const {
    dataHero,
    dataIntro,
    dataHomeProducts,
    listAllProducts,
    dataHomeServices,
    listAllServices,
    locale,
  } = props;
  const [isDesktopScreen, isTabletScreen, isMobileScreen] = useIsWideScreen();

  return (
    <>
      <section className={styles.hero}>
        {dataHero && (
          <>
            {isMobileScreen && (
              <BackgroundImage imageUrl={dataHero.backgroundImageMobile} />
            )}

            {isTabletScreen && (
              <BackgroundImage imageUrl={dataHero.backgroundImageTablet} />
            )}

            {isDesktopScreen && (
              <BackgroundImage imageUrl={dataHero.backgroundImageDesktop} />
            )}

            {locale === Lang.UK && (
              <ContentHeroHome
                title={dataHero.titleUK}
                subtitle={dataHero.subtitleUK}
                locale={locale}
              />
            )}
            {locale === Lang.EN && (
              <ContentHeroHome
                title={dataHero.titleEN}
                subtitle={dataHero.subtitleEN}
                locale={locale}
              />
            )}
            {locale === Lang.TR && (
              <ContentHeroHome
                title={dataHero.titleTR}
                subtitle={dataHero.subtitleTR}
                locale={locale}
              />
            )}
            <AnimationHeroHome title={dataHero.titleUK} />
          </>
        )}
      </section>

      <section className={styles.intro}>
        {dataIntro && (
          <>
            {isMobileScreen && (
              <BackgroundImage imageUrl={dataIntro.backgroundImageMobile} />
            )}

            {isTabletScreen && (
              <BackgroundImage imageUrl={dataIntro.backgroundImageTablet} />
            )}

            {isDesktopScreen && (
              <BackgroundImage imageUrl={dataIntro.backgroundImageDesktop} />
            )}
            <AnimationIntro text={dataIntro.text} sign={dataIntro.sign} />
          </>
        )}
      </section>

      <section className={styles.products}>
        {dataHomeProducts && (
          <>
            <BackgroundImage
              imageUrl={dataHomeProducts.backgroundImageMobile}
            />

            {isTabletScreen && (
              <BackgroundImage
                imageUrl={dataHomeProducts.backgroundImageTablet}
              />
            )}

            {isDesktopScreen && (
              <BackgroundImage
                imageUrl={dataHomeProducts.backgroundImageDesktop}
              />
            )}
            {locale === Lang.UK && (
              <>
                <ContentHeroOtherPages
                  title={dataHomeProducts.titleUK}
                  classTitleHome={true}
                />

                {isDesktopScreen && (
                  <AnimationHeroOtherPages
                    title={dataHomeProducts.titleUK}
                    top="600px"
                  />
                )}
                {isTabletScreen && (
                  <AnimationHeroOtherPages
                    title={dataHomeProducts.titleUK}
                    top="630px"
                  />
                )}
                {isMobileScreen && (
                  <AnimationHeroOtherPages
                    title={dataHomeProducts.titleUK}
                    top="35px"
                  />
                )}
              </>
            )}
            {locale === Lang.EN && (
              <>
                <ContentHeroOtherPages
                  title={dataHomeProducts.titleEN}
                  classTitleHome={true}
                />

                {isDesktopScreen && (
                  <AnimationHeroOtherPages
                    title={dataHomeProducts.titleEN}
                    top="600px"
                  />
                )}
                {isTabletScreen && (
                  <AnimationHeroOtherPages
                    title={dataHomeProducts.titleEN}
                    top="630px"
                  />
                )}
                {isMobileScreen && (
                  <AnimationHeroOtherPages
                    title={dataHomeProducts.titleEN}
                    top="35px"
                  />
                )}
              </>
            )}
            {locale === Lang.TR && (
              <>
                <ContentHeroOtherPages
                  title={dataHomeProducts.titleTR}
                  classTitleHome={true}
                />

                {isDesktopScreen && (
                  <AnimationHeroOtherPages
                    title={dataHomeProducts.titleTR}
                    top="600px"
                  />
                )}
                {isTabletScreen && (
                  <AnimationHeroOtherPages
                    title={dataHomeProducts.titleTR}
                    top="630px"
                  />
                )}
                {isMobileScreen && (
                  <AnimationHeroOtherPages
                    title={dataHomeProducts.titleTR}
                    top="35px"
                  />
                )}
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
            {/* <BackgroundImage imageUrl={dataHomeServices.backgroundImageMobile} /> */}

            {isTabletScreen && (
              <BackgroundImage
                imageUrl={dataHomeServices.backgroundImageTablet}
              />
            )}

            {isDesktopScreen && (
              <BackgroundImage
                imageUrl={dataHomeServices.backgroundImageDesktop}
              />
            )}

            {locale === Lang.UK && (
              <>
                <ContentHeroOtherPages
                  title={dataHomeServices.titleUK}
                  classTitleHome={true}
                />
                {isDesktopScreen && (
                  <AnimationHeroOtherPages
                    title={dataHomeServices.titleUK}
                    top="600px"
                  />
                )}
                {isTabletScreen && (
                  <AnimationHeroOtherPages
                    title={dataHomeServices.titleUK}
                    top="630px"
                  />
                )}
              </>
            )}
            {locale === Lang.EN && (
              <>
                <ContentHeroOtherPages
                  title={dataHomeServices.titleEN}
                  classTitleHome={true}
                />
                {isDesktopScreen && (
                  <AnimationHeroOtherPages
                    title={dataHomeServices.titleEN}
                    top="600px"
                  />
                )}
                {isTabletScreen && (
                  <AnimationHeroOtherPages
                    title={dataHomeServices.titleEN}
                    top="630px"
                  />
                )}
              </>
            )}
            {locale === Lang.TR && (
              <>
                <ContentHeroOtherPages
                  title={dataHomeServices.titleTR}
                  classTitleHome={true}
                />
                {isDesktopScreen && (
                  <AnimationHeroOtherPages
                    title={dataHomeServices.titleTR}
                    top="600px"
                  />
                )}
                {isTabletScreen && (
                  <AnimationHeroOtherPages
                    title={dataHomeServices.titleTR}
                    top="630px"
                  />
                )}
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
export default ClientHomePage;
