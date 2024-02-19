import styles from './ContentHeroOtherPages.module.scss';

interface IProps {
  title: string | undefined;
  subtitle?: string;
  classTitleHome?: boolean;
}

const ContentHeroOtherPages = ({
  title,
  subtitle,
  classTitleHome = false,
}: IProps) => {
  return (
    <div className={classTitleHome ? styles.wrapperTitleHome : styles.wrapper}>
      <h1 className={classTitleHome ? styles.titleHome : styles.title}>
        {title}
      </h1>
      <p className={styles.subtitle}>{subtitle}</p>
    </div>
  );
};
export default ContentHeroOtherPages;
