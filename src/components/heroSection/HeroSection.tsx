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
  const [isDesktopScreen, isTabletScreen, isMobileScreen] = useIsWideScreen();
  return (
    <section className={styles.heroSection}>
      <BackgroundImage
        imageUrl={
          (isDesktopScreen && backgroundImage.desktop
            ? backgroundImage.desktop
            : undefined) ||
          (isTabletScreen && backgroundImage.tablet
            ? backgroundImage.tablet
            : undefined) ||
          (isMobileScreen && backgroundImage.mobile
            ? backgroundImage.mobile
            : undefined)
        }
      />
      <ContentHeroOtherPages title={title} subtitle={subtitle} />

      <AnimationHeroOtherPages
        title={title}
        top={
          (isTabletScreen ? '48px' : undefined) ||
          (isMobileScreen ? '50px' : undefined)
        }
      />
    </section>
  );
};

export default HeroSection;
