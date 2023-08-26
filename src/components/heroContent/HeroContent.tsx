import Content from 'components/content/Content';
import styles from './HeroContent.module.scss';

interface IProps {
  content: string;
}

const HeroContent = ({ content }: IProps) => {
  return (
    <>
      <Content content={content} />
      <div className={styles.wrapperBtn}>
        <button className={styles.btn} type="button">
          Зв’яжіться з нами
        </button>
      </div>
    </>
  );
};
export default HeroContent;
