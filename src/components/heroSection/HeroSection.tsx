import BackgroundImage from 'components/backgroundImage/BackgroundImage';
import styles from './HeroSection.module.scss';
import ContentHeroOtherPages from 'components/contentHeroOtherPages/ContentHeroOtherPages';
import AnimationHeroOtherPages from 'components/anomationHeroOtherPages/AnimationHeroOtherPages';

interface IProps {
  title: string | undefined;
  subtitle: string | undefined;
  backgroundImage: string | undefined;
  initialAnimation: number;
}

const HeroSection = ({
  title,
  subtitle,
  backgroundImage,
  initialAnimation,
}: IProps) => (
  <section className={styles.heroSection}>
    {backgroundImage && <BackgroundImage imageUrl={backgroundImage} />}
    {title && <ContentHeroOtherPages title={title} subtitle={subtitle} />}
    {title && (
      <AnimationHeroOtherPages title={title} initial={initialAnimation} />
    )}
  </section>
);
export default HeroSection;
