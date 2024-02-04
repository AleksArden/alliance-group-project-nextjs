'use client';

import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';

import styles from './SliderHomeServices.module.scss';
import Image from 'next/image';
import MainButton from 'components/mainButton/mainButton';
import { getNameForAdressBar, getSliderSettings } from 'helpers/functions';

import { useRouter } from 'next/navigation';
import { ProductServiceType } from 'types/dataTypeForFirebase';
import { Lang } from 'types/otherType';
import { useEffect, useState } from 'react';
import { useIsWideScreen } from 'hooks/useIsWideScreen';

interface IProps {
  services: ProductServiceType[];
  locale: string;
}

const SliderHomeServices = ({ services, locale }: IProps) => {
  const router = useRouter();
  const [isDesktopScreen, isTabletScreen, isMobileScreen] = useIsWideScreen();
  const [nameBtn, setNameBtn] = useState('');

  useEffect(() => {
    switch (locale) {
      case Lang.UK:
        setNameBtn('Детальніше');
        break;
      case Lang.EN:
        setNameBtn('More details');
        break;
      default:
        setNameBtn('Daha fazla detay');
        break;
    }
  }, [locale]);
  return (
    <>
      {(isDesktopScreen || isTabletScreen) && (
        <Splide
          className={services.length === 0 ? styles.hidden : styles.container}
          aria-label="My Favorite Images"
          options={{
            fixedWidth: 600,
            height: 400,
            width: getSliderSettings(services).width,
            tag: 'div',
            type: 'loop',
            perPage: getSliderSettings(services).perPage,
            perMove: 1,
            gap: '80px',
          }}
        >
          {services.map(({ id, imageURL, nameUK, nameEN, nameTR }) => {
            const addressBarName = getNameForAdressBar(nameEN);
            return (
              <SplideSlide key={id} className={styles.productWrapper}>
                <div className={styles.imageWrapper}>
                  <Image
                    src={imageURL}
                    fill
                    sizes="580px"
                    alt="The product photo"
                    priority
                    className={styles.image}
                  />
                  {locale === Lang.UK && (
                    <p className={styles.name}>{nameUK}</p>
                  )}
                  {locale === Lang.EN && (
                    <p className={styles.name}>{nameEN}</p>
                  )}
                  {locale === Lang.TR && (
                    <p className={styles.name}>{nameTR}</p>
                  )}

                  <div className={styles.btnWrapper}>
                    <MainButton
                      name={nameBtn}
                      styleWrapperBtn={{
                        width: 259,
                        borderColor: '#FFFFFF80',
                      }}
                      styleBtn={{ width: 251 }}
                      type="button"
                      onClick={() =>
                        router.push(
                          `/${locale}/products-services/${addressBarName}`
                        )
                      }
                    />
                  </div>
                </div>
              </SplideSlide>
            );
          })}
        </Splide>
      )}
      {isMobileScreen && (
        <Splide
          className={services.length === 0 ? styles.hidden : styles.container}
          aria-label="My Favorite Images"
          options={{
            fixedWidth: 360,
            height: 480,
            width: getSliderSettings(services).width,
            tag: 'div',
            type: 'loop',
            perPage: getSliderSettings(services).perPage,
            perMove: 1,
            gap: '50px',
          }}
        >
          {services.map(({ id, imageURL, nameUK, nameEN, nameTR }) => {
            const addressBarName = getNameForAdressBar(nameEN);
            return (
              <SplideSlide key={id} className={styles.productWrapper}>
                <div className={styles.imageWrapper}>
                  <Image
                    src={imageURL}
                    fill
                    sizes="360px"
                    alt="The product photo"
                    priority
                    className={styles.image}
                  />
                  {locale === Lang.UK && (
                    <p className={styles.name}>{nameUK}</p>
                  )}
                  {locale === Lang.EN && (
                    <p className={styles.name}>{nameEN}</p>
                  )}
                  {locale === Lang.TR && (
                    <p className={styles.name}>{nameTR}</p>
                  )}

                  <div className={styles.btnWrapper}>
                    <MainButton
                      name={nameBtn}
                      styleWrapperBtn={{
                        width: 189,
                        borderColor: '#FFFFFF80',
                        height: 62,
                        borderRadius: '32px 0 59px 32px',
                      }}
                      styleBtn={{
                        width: 189,
                        height: 54,
                        borderRadius: '27px 0 54px 27px',
                      }}
                      type="button"
                      onClick={() =>
                        router.push(
                          `/${locale}/products-services/${addressBarName}`
                        )
                      }
                    />
                  </div>
                </div>
              </SplideSlide>
            );
          })}
        </Splide>
      )}
    </>
  );
};
export default SliderHomeServices;
