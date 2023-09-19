'use client';

import styles from './HeroContent.module.scss';
import MainButton from 'components/mainButton/mainButton';
import { arrayCompanyName } from 'helpers/functions';
import { useRouter } from 'next/navigation';

interface IProps {
  title: string;
  subtitle: string;
}

const HeroContent = ({ title, subtitle }: IProps) => {
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
      <div>
        <h1 className={styles.firstPartCompanyName}>
          {arrayCompanyName(title)[0]}
        </h1>
        <h2 className={styles.secondPartCompanyName}>
          {arrayCompanyName(title)[1]}
        </h2>
      </div>
      <p className={styles.subtitle}>{subtitle}</p>
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
