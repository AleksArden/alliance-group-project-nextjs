'use client';

import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { ProductType } from 'types/dataTypeForFirebase';
import styles from './SliderHomeProducts.module.scss';
import Image from 'next/image';
import MainButton from 'components/mainButton/mainButton';
import { getSliderSettings } from 'helpers/functions';

const SliderHomeProducts = ({ products }: { products: ProductType[] }) => {
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
      {products.map(({ productId, imageProduct, nameUA, sizeUA }) => (
        <SplideSlide key={productId} className={styles.productWrapper}>
          <div className={styles.imageWrapper}>
            <Image
              src={imageProduct}
              fill
              sizes="100vw"
              alt="The product photo"
              priority
              className={styles.image}
            />
            <p className={styles.name}>{nameUA}</p>
            <p className={styles.size}>{sizeUA}</p>
            <div className={styles.btnWrapper}>
              <MainButton
                name="Детальніше"
                styleWrapperBtn={{ width: 259, borderColor: '#FFFFFF80' }}
                styleBtn={{ width: 251 }}
                type="button"
              />
            </div>
          </div>
        </SplideSlide>
      ))}
    </Splide>
  );
};
export default SliderHomeProducts;