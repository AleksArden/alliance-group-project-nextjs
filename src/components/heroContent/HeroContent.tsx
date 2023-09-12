'use client';
import Content from 'components/content/Content';
import styles from './HeroContent.module.scss';
import MainButton from 'components/mainButton/mainButton';
import { useRouter } from 'next/navigation';

interface IProps {
  content: string;
}

const HeroContent = ({ content }: IProps) => {
  const router = useRouter();
  const handleClick = () => {
    router.push('contacts');
    setTimeout(() => {
      window.scrollBy({
        top: 1780,

        behavior: 'smooth',
      });
    }, 300);
  };
  return (
    <div className={styles.container}>
      <Content content={content} />
      <MainButton
        name="Зв’яжіться з нами"
        styleWrapperBtn={{ width: 350, borderColor: '#ffffff80' }}
        styleBtn={{ width: 340 }}
        onClick={handleClick}
        type="button"
      />
    </div>
  );
};
export default HeroContent;
