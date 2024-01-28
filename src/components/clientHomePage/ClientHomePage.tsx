'use client';

import styles from './ClientHomePage.module.scss';
import { HomePageType, IntroType } from 'types/dataTypeForFirebase';
import BackgroundImage from 'components/backgroundImage/BackgroundImage';
import AnimationIntro from 'components/animationIntro/AnimationIntro';
import { Lang } from 'types/otherType';
import ContentHeroHome from 'components/contentHeroHome/ContentHeroHome';
import AnimationHeroHome from 'components/animationHeroHome/AnimationHeroHome';

import { useIsWideScreen } from 'hooks/useIsWideScreen';

interface IProps {
  props: {
    dataHero: HomePageType | undefined;
    dataIntro: IntroType | undefined;
    locale: string;
  };
}

const ClientHomePage = ({ props }: IProps) => {
  const { dataHero, dataIntro, locale } = props;
  const [isDesktopScreen, isTabletScreen] = useIsWideScreen();

  return (
    <>
      <section className={styles.hero}>
        {dataHero && (
          <>
            {/* <BackgroundImage imageUrl={dataHero.backgroundImageMobile} /> */}

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
            {/* <BackgroundImage imageUrl={dataIntro.backgroundImageMobile} /> */}

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
    </>
  );
};
export default ClientHomePage;
