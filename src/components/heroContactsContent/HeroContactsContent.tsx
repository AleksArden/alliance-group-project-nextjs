import styles from './HeroContactsContent.module.scss';

interface IProps {
  title: string;
  subtitle: string;
}

const HeroContactsContent = ({ title, subtitle }: IProps) => {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.subtitle}>{subtitle}</p>
    </div>
  );
};
export default HeroContactsContent;
