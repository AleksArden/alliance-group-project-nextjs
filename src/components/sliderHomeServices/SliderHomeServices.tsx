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
import { TranslationsNameBtnProductServicesPage } from 'lang/translations';

interface IProps {
  services: ProductServiceType[];
  locale: string;
}

const SliderHomeServices = ({ services, locale }: IProps) => {
  const router = useRouter();
  const [, , isMobileScreen] = useIsWideScreen();
  const [nameBtn, setNameBtn] = useState('');

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
  return (
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
        breakpoints: {
          767: {
            fixedWidth: 360,
            height: 480,
            gap: '50px',
            width: getSliderSettings(services, 'mobile').width,
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
                priority
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
  );
};
export default SliderHomeServices;
