import styles from './ContentHeroOtherPages.module.scss';

interface IProps {
  title: string;
  subtitle: string;
}

const ContentHeroOtherPages = ({ title, subtitle }: IProps) => {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.subtitle}>{subtitle}</p>
    </div>
  );
};
export default ContentHeroOtherPages;
