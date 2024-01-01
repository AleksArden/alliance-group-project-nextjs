'use client';

import { FormattedMessage } from 'react-intl';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { ProductType } from 'types/dataTypeForFirebase';
import styles from './SliderHomeProducts.module.scss';
import Image from 'next/image';
import MainButton from 'components/mainButton/mainButton';
import { getNameForAdressBar, getSliderSettings } from 'helpers/functions';
import LangContainerForClientComponent from 'components/langContainerForClientComponent/LangContainerForClientComponent';
import { useRouter } from 'next/navigation';

interface IProps {
  products: ProductType[];
  locale: string;
}

const SliderHomeProducts = ({ products, locale }: IProps) => {
  const router = useRouter();
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
        ({ id, imageURL, nameUK, sizeUK, nameEN, sizeEN, nameTR, sizeTR }) => (
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
              {locale === 'uk' && (
                <>
                  <p className={styles.name}>{nameUK}</p>
                  <p className={styles.size}>{sizeUK}</p>
                </>
              )}
              {locale === 'en' && (
                <>
                  <p className={styles.name}>{nameEN}</p>
                  <p className={styles.size}>{sizeEN}</p>
                </>
              )}
              {locale === 'tr' && (
                <>
                  <p className={styles.name}>{nameTR}</p>
                  <p className={styles.size}>{sizeTR}</p>
                </>
              )}
              <LangContainerForClientComponent locale={locale}>
                <div>
                  <div className={styles.btnWrapper}>
                    <MainButton
                      name={
                        <FormattedMessage id="page.home.products-services.btn" />
                      }
                      styleWrapperBtn={{
                        width: 259,
                        borderColor: '#FFFFFF80',
                      }}
                      styleBtn={{ width: 251 }}
                      type="button"
                      onClick={() =>
                        router.push(
                          `/${locale}/products-services/${getNameForAdressBar(
                            nameEN
                          )}`
                        )
                      }
                    />
                  </div>
                </div>
              </LangContainerForClientComponent>
            </div>
          </SplideSlide>
        )
      )}
    </Splide>
  );
};
export default SliderHomeProducts;
