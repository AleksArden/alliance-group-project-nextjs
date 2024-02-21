'use client';

import { Splide, SplideSlide } from '@splidejs/react-splide';

import '@splidejs/react-splide/css';
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

interface IProps {
  props: {
    dataHomeHero: HomePageType | undefined;
    dataHomeIntro: IntroType | undefined;
    dataHomeProducts: HomeProductsType | undefined;
    listAllProducts: ProductServiceType[] | undefined;
    dataHomeServices: HomeServicesType | undefined;
    listAllServices: ProductServiceType[] | undefined;
    locale: string;
  };
}

const ClientHomePage = ({ props }: IProps) => {
  const {
    dataHomeHero,
    dataHomeIntro,
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
        {dataHomeHero && (
          <>
            <Splide
              className={styles.splide}
              aria-label="My Favorite Images"
              options={{
                type: 'fade',
                perPage: 1,
                rewind: true,
                autoplay: true,
                height: 1080,
                width: ' 100vw',
                speed: 2000,
                arrows: false,
                interval: 4000,
                tag: 'div',
              }}
            >
              <SplideSlide>
                <BackgroundImage
                  imageUrl={
                    (isDesktopScreen
                      ? dataHomeHero.firstBackgroundImageDesktop
                      : undefined) ||
                    (isTabletScreen
                      ? dataHomeHero.firstBackgroundImageTablet
                      : undefined) ||
                    (isMobileScreen
                      ? dataHomeHero.firstBackgroundImageMobile
                      : undefined)
                  }
                />
              </SplideSlide>
              <SplideSlide>
                <BackgroundImage
                  imageUrl={
                    (isDesktopScreen
                      ? dataHomeHero.secondBackgroundImageDesktop
                      : undefined) ||
                    (isTabletScreen
                      ? dataHomeHero.secondBackgroundImageTablet
                      : undefined) ||
                    (isMobileScreen
                      ? dataHomeHero.secondBackgroundImageMobile
                      : undefined)
                  }
                />
              </SplideSlide>
              <SplideSlide>
                <BackgroundImage
                  imageUrl={
                    (isDesktopScreen
                      ? dataHomeHero.thirdBackgroundImageDesktop
                      : undefined) ||
                    (isTabletScreen
                      ? dataHomeHero.thirdBackgroundImageTablet
                      : undefined) ||
                    (isMobileScreen
                      ? dataHomeHero.thirdBackgroundImageMobile
                      : undefined)
                  }
                />
              </SplideSlide>
            </Splide>

            {locale === Lang.UK && (
              <ContentHeroHome
                title={dataHomeHero.titleUK}
                subtitle={dataHomeHero.subtitleUK}
                locale={locale}
              />
            )}
            {locale === Lang.EN && (
              <ContentHeroHome
                title={dataHomeHero.titleEN}
                subtitle={dataHomeHero.subtitleEN}
                locale={locale}
              />
            )}
            {locale === Lang.TR && (
              <ContentHeroHome
                title={dataHomeHero.titleTR}
                subtitle={dataHomeHero.subtitleTR}
                locale={locale}
              />
            )}
            <AnimationHeroHome title={dataHomeHero.titleUK} />
          </>
        )}
      </section>

      <section className={styles.intro}>
        {dataHomeIntro && (
          <>
            <BackgroundImage
              imageUrl={
                (isDesktopScreen
                  ? dataHomeIntro.backgroundImageDesktop
                  : undefined) ||
                (isTabletScreen
                  ? dataHomeIntro.backgroundImageTablet
                  : undefined) ||
                (isMobileScreen
                  ? dataHomeIntro.backgroundImageMobile
                  : undefined)
              }
            />
            <AnimationIntro
              text={dataHomeIntro.text}
              sign={dataHomeIntro.sign}
            />
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

            <>
              <ContentHeroOtherPages
                title={
                  locale === Lang.UK
                    ? dataHomeProducts.titleUK
                    : undefined || locale === Lang.EN
                    ? dataHomeProducts.titleEN
                    : undefined || locale === Lang.TR
                    ? dataHomeProducts.titleTR
                    : undefined
                }
                classTitleHome={true}
              />

              <AnimationHeroOtherPages
                title={
                  locale === Lang.UK
                    ? dataHomeProducts.titleUK
                    : undefined || locale === Lang.EN
                    ? dataHomeProducts.titleEN
                    : undefined || locale === Lang.TR
                    ? dataHomeProducts.titleTR
                    : undefined
                }
                top={
                  (isDesktopScreen ? '600px' : undefined) ||
                  (isTabletScreen ? '630px' : undefined) ||
                  (isMobileScreen ? '35px' : undefined)
                }
              />
            </>

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

            <>
              <ContentHeroOtherPages
                title={
                  locale === Lang.UK
                    ? dataHomeServices.titleUK
                    : undefined || locale === Lang.EN
                    ? dataHomeServices.titleEN
                    : undefined || locale === Lang.TR
                    ? dataHomeServices.titleTR
                    : undefined
                }
                classTitleHome={true}
              />

              <AnimationHeroOtherPages
                title={
                  locale === Lang.UK
                    ? dataHomeServices.titleUK
                    : undefined || locale === Lang.EN
                    ? dataHomeServices.titleEN
                    : undefined || locale === Lang.TR
                    ? dataHomeServices.titleTR
                    : undefined
                }
                top={
                  (isDesktopScreen ? '600px' : undefined) ||
                  (isTabletScreen ? '630px' : undefined) ||
                  (isMobileScreen ? '35px' : undefined)
                }
              />
            </>

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
