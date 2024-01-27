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

interface IProps {
  products: ProductServiceType[];
  locale: string;
}

const SliderHomeProducts = ({ products, locale }: IProps) => {
  const router = useRouter();
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
                  sizes="580px"
                  alt="The product photo"
                  loading="lazy"
                  className={styles.image}
                />
                {locale === Lang.UK && (
                  <>
                    <p className={styles.name}>{nameUK}</p>
                    <p className={styles.size}>{sizeUK}</p>
                  </>
                )}
                {locale === Lang.EN && (
                  <>
                    <p className={styles.name}>{nameEN}</p>
                    <p className={styles.size}>{sizeEN}</p>
                  </>
                )}
                {locale === Lang.TR && (
                  <>
                    <p className={styles.name}>{nameTR}</p>
                    <p className={styles.size}>{sizeTR}</p>
                  </>
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
