import BackgroundImage from 'components/backgroundImage/BackgroundImage';
import styles from './HeroSection.module.scss';
import ContentHeroOtherPages from 'components/contentHeroOtherPages/ContentHeroOtherPages';
import AnimationHeroOtherPages from 'components/anomationHeroOtherPages/AnimationHeroOtherPages';

interface IProps {
  title: string | undefined;
  subtitle?: string | undefined;
  backgroundImage: string | undefined;
}

const HeroSection = ({ title, subtitle, backgroundImage }: IProps) => (
  <section className={styles.heroSection}>
    {/* {backgroundImage && <BackgroundImage imageUrl={backgroundImage} />} */}
    {title && <ContentHeroOtherPages title={title} subtitle={subtitle} />}
    {title && <AnimationHeroOtherPages title={title} />}
  </section>
);
export default HeroSection;
