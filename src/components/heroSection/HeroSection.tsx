'use client';

import BackgroundImage from 'components/backgroundImage/BackgroundImage';
import styles from './HeroSection.module.scss';
import ContentHeroOtherPages from 'components/contentHeroOtherPages/ContentHeroOtherPages';
import AnimationHeroOtherPages from 'components/anomationHeroOtherPages/AnimationHeroOtherPages';
import { useIsWideScreen } from 'hooks/useIsWideScreen';

interface IProps {
  title: string | undefined;
  subtitle?: string | undefined;
  backgroundImage: {
    desktop: string | undefined;
    tablet: string | undefined;
    mobile: string | undefined;
  };
}

const HeroSection = ({ title, subtitle, backgroundImage }: IProps) => {
  const [isDesktopScreen, isTabletScreen] = useIsWideScreen();
  return (
    <section className={styles.heroSection}>
      {/* <BackgroundImage imageUrl={dataHero.backgroundImageMobile} /> */}

      {isTabletScreen && backgroundImage.tablet && (
        <BackgroundImage imageUrl={backgroundImage.tablet} />
      )}

      {isDesktopScreen && backgroundImage.desktop && (
        <BackgroundImage imageUrl={backgroundImage.desktop} />
      )}
      {title && <ContentHeroOtherPages title={title} subtitle={subtitle} />}
      {isTabletScreen && title && (
        <AnimationHeroOtherPages title={title} top="48px" />
      )}
    </section>
  );
};

export default HeroSection;
