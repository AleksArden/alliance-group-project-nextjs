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
            <BackgroundImage
              imageUrl={
                (isDesktopScreen
                  ? dataHero.backgroundImageDesktop
                  : undefined) ||
                (isTabletScreen ? dataHero.backgroundImageTablet : undefined) ||
                (isMobileScreen ? dataHero.backgroundImageMobile : undefined)
              }
            />

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
            <BackgroundImage
              imageUrl={
                (isDesktopScreen
                  ? dataIntro.backgroundImageDesktop
                  : undefined) ||
                (isTabletScreen
                  ? dataIntro.backgroundImageTablet
                  : undefined) ||
                (isMobileScreen ? dataIntro.backgroundImageMobile : undefined)
              }
            />
            <AnimationIntro text={dataIntro.text} sign={dataIntro.sign} />
          </>
        )}
      </section>

      <section className={styles.products}>
        {dataHomeProducts && (
          <>
            <BackgroundImage
              imageUrl={
                (isDesktopScreen
                  ? dataHomeProducts.backgroundImageDesktop
                  : undefined) ||
                (isTabletScreen
                  ? dataHomeProducts.backgroundImageTablet
                  : undefined) ||
                (isMobileScreen
                  ? dataHomeProducts.backgroundImageMobile
                  : undefined)
              }
            />
            {locale === Lang.UK && (
              <>
                <ContentHeroOtherPages
                  title={dataHomeProducts.titleUK}
                  classTitleHome={true}
                />

                <AnimationHeroOtherPages
                  title={dataHomeProducts.titleUK}
                  top={
                    (isDesktopScreen ? '600px' : undefined) ||
                    (isTabletScreen ? '630px' : undefined) ||
                    (isMobileScreen ? '35px' : undefined)
                  }
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
                  top={
                    (isDesktopScreen ? '600px' : undefined) ||
                    (isTabletScreen ? '630px' : undefined) ||
                    (isMobileScreen ? '35px' : undefined)
                  }
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
                  top={
                    (isDesktopScreen ? '600px' : undefined) ||
                    (isTabletScreen ? '630px' : undefined) ||
                    (isMobileScreen ? '35px' : undefined)
                  }
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
              imageUrl={
                (isDesktopScreen
                  ? dataHomeServices.backgroundImageDesktop
                  : undefined) ||
                (isTabletScreen
                  ? dataHomeServices.backgroundImageTablet
                  : undefined) ||
                (isMobileScreen
                  ? dataHomeServices.backgroundImageMobile
                  : undefined)
              }
            />

            {locale === Lang.UK && (
              <>
                <ContentHeroOtherPages
                  title={dataHomeServices.titleUK}
                  classTitleHome={true}
                />

                <AnimationHeroOtherPages
                  title={dataHomeServices.titleUK}
                  top={
                    (isDesktopScreen ? '600px' : undefined) ||
                    (isTabletScreen ? '630px' : undefined) ||
                    (isMobileScreen ? '35px' : undefined)
                  }
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
                  top={
                    (isDesktopScreen ? '600px' : undefined) ||
                    (isTabletScreen ? '630px' : undefined) ||
                    (isMobileScreen ? '35px' : undefined)
                  }
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
                  top={
                    (isDesktopScreen ? '600px' : undefined) ||
                    (isTabletScreen ? '630px' : undefined) ||
                    (isMobileScreen ? '35px' : undefined)
                  }
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
export default ClientHomePage;
