'use client';

import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';

import styles from './SliderHomeProducts.module.scss';
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
  products: ProductServiceType[];
  locale: string;
}

const SliderHomeProducts = ({ products, locale }: IProps) => {
  const router = useRouter();
  const [nameBtn, setNameBtn] = useState('');
  const [, , isMobileScreen] = useIsWideScreen();

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
      className={products.length === 0 ? styles.hidden : styles.container}
      aria-label="My Favorite Images"
      options={{
        fixedWidth: 600,
        height: 400,

        width: getSliderSettings(products).width,
        tag: 'div',
        type: 'loop',
        perPage: getSliderSettings(products).perPage,
        perMove: 1,
        gap: '80px',
        breakpoints: {
          767: {
            fixedWidth: 360,
            height: 480,
            gap: '50px',
            width: getSliderSettings(products, 'mobile').width,
          },
        },
      }}
    >
      {products.map(
        ({ id, imageURL, nameUK, sizeUK, nameEN, sizeEN, nameTR, sizeTR }) => {
          const adressBarName = getNameForAdressBar(nameEN);
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
                <p className={styles.size}>
                  {(locale === Lang.UK && sizeUK) ||
                    (locale === Lang.EN && sizeEN) ||
                    (locale === Lang.TR && sizeTR)}
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
                        `/${locale}/products-services/${adressBarName}`
                      );
                    }}
                  />
                </div>
              </div>
            </SplideSlide>
          );
        }
      )}
    </Splide>
  );
};
export default SliderHomeProducts;
