'use client';

import { Splide, SplideSlide } from '@splidejs/react-splide';

import styles from './SliderHomeServices.module.scss';
import Image from 'next/image';
import MainButton from 'components/mainButton/mainButton';
import { getNameForAdressBar } from 'helpers/functions';

import { useRouter } from 'next/navigation';
import { ProductServiceType } from 'types/dataTypeForFirebase';
import { Lang } from 'types/otherType';
import { useEffect, useRef, useState } from 'react';
import { useIsWideScreen } from 'hooks/useIsWideScreen';
import { TranslationsNameBtnProductServicesPage } from 'lang/translations';
import SliderButtons from 'components/sliderButtons/SliderButtons';

interface IProps {
  services: ProductServiceType[];
  locale: string;
}

const SliderHomeServices = ({ services, locale }: IProps) => {
  const router = useRouter();
  const [, , isMobileScreen] = useIsWideScreen();
  const [nameBtn, setNameBtn] = useState('');
  const mainRef = useRef<Splide>(null);

  useEffect(() => {
    switch (locale) {
      case Lang.UK:
        setNameBtn(TranslationsNameBtnProductServicesPage.uk);
        break;
      case Lang.EN:
        setNameBtn(TranslationsNameBtnProductServicesPage.en);
        break;
      default:
        setNameBtn(TranslationsNameBtnProductServicesPage.tr);
        break;
    }
  }, [locale]);

  const handleThumbs = (id: string) => {
    if (mainRef.current) {
      mainRef.current.go(id);
    }
  };
  return (
    <>
      {services.length > 1 && <SliderButtons onClick={handleThumbs} />}

      <Splide
        ref={mainRef}
        className={services.length === 0 ? styles.hidden : styles.container}
        aria-label="My Favorite Images"
        options={{
          arrows: false,
          autoWidth: true,
          autoHeight: true,
          perPage: 1,
          gap: '80px',
          breakpoints: {
            767: {
              gap: '50px',
            },
          },
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
                  sizes={isMobileScreen ? '360px' : '580px'}
                  alt="The product photo"
                  loading="lazy"
                  className={styles.image}
                />
                <p className={styles.name}>
                  {(locale === Lang.UK && nameUK) ||
                    (locale === Lang.EN && nameEN) ||
                    (locale === Lang.TR && nameTR)}
                </p>

                <div className={styles.btnWrapper}>
                  <MainButton
                    name={nameBtn}
                    styleWrapperBtn={
                      isMobileScreen
                        ? {
                            width: 189,
                            borderColor: '#FFFFFF80',
                            height: 62,
                            borderRadius: '32px 0 59px 32px',
                          }
                        : {
                            width: 259,
                            borderColor: '#FFFFFF80',
                          }
                    }
                    styleBtn={
                      isMobileScreen
                        ? {
                            width: 179,
                            height: 54,
                            borderRadius: '27px 0 54px 27px',
                          }
                        : { width: 249 }
                    }
                    type="button"
                    onClick={() => {
                      router.push(
                        `/${locale}/products-services/${addressBarName}`
                      );
                    }}
                  />
                </div>
              </div>
            </SplideSlide>
          );
        })}
      </Splide>
    </>
  );
};
export default SliderHomeServices;
