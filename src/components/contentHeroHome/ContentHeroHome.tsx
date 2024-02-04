'use client';

import styles from './ContentHeroHome.module.scss';
import MainButton from 'components/mainButton/mainButton';

import { arrayCompanyName } from 'helpers/functions';
import { useIsWideScreen } from 'hooks/useIsWideScreen';
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
  const [isDesktopScreen, isTabletScreen, isMobileScreen] = useIsWideScreen();

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

      {(isDesktopScreen || isTabletScreen) && (
        <MainButton
          name={nameBtn}
          styleWrapperBtn={{ width: 350, borderColor: '#ffffff80' }}
          styleBtn={{ width: 340 }}
          onClick={handleClick}
          type="button"
        />
      )}
      {isMobileScreen && (
        <MainButton
          name={nameBtn}
          styleWrapperBtn={{
            width: 259,
            height: 62,
            borderColor: '#ffffff80',
            borderRadius: '32px 0 59px 32px',
          }}
          styleBtn={{
            width: 251,
            height: 54,
            borderRadius: '27px 0 54px 27px',
          }}
          onClick={handleClick}
          type="button"
        />
      )}
    </div>
  );
};
export default ContentHeroHome;
