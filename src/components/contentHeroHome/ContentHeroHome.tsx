'use client';

import styles from './ContentHeroHome.module.scss';
import MainButton from 'components/mainButton/mainButton';

import { arrayCompanyName } from 'helpers/functions';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Lang } from 'types/otherType';

interface IProps {
  title: string;
  subtitle: string;
  locale: string;
}

const ContentHeroHome = ({ title, subtitle, locale }: IProps) => {
  const router = useRouter();

  const [nameBtn, setNameBtn] = useState('');

  useEffect(() => {
    switch (locale) {
      case Lang.UK:
        setNameBtn('Зв’яжіться з нами');
        break;
      case Lang.EN:
        setNameBtn('Contact us');
        break;
      default:
        setNameBtn('Bize Ulaşın');
        break;
    }
  }, [locale]);

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
        name={nameBtn}
        styleWrapperBtn={{ width: 350, borderColor: '#ffffff80' }}
        styleBtn={{ width: 340 }}
        onClick={handleClick}
        type="button"
      />
    </div>
  );
};
export default ContentHeroHome;
