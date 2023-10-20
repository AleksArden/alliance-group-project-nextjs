'use client';

import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { ProductType } from 'types/dataTypeForFirebase';
import styles from './SliderHomeProducts.module.scss';
import Image from 'next/image';
import MainButton from 'components/mainButton/mainButton';

const SliderHomeProducts = ({ products }: { products: ProductType[] }) => {
  return (
    <Splide
      className={styles.containerSlider}
      aria-label="My Favorite Images"
      options={{
        tag: 'div',
        type: 'loop',
        perPage: 3,
        perMove: 1,
        gap: '80px',
      }}
    >
      {products.map(({ productId, imageProduct, nameUA, sizeUA }) => (
        <SplideSlide key={productId}>
          <div className={styles.productWrapper}>
            <div className={styles.imageWrapper}>
              <Image
                src={imageProduct}
                fill
                sizes="100vw"
                alt="The staff photo"
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
          </div>
        </SplideSlide>
      ))}
    </Splide>
  );
};
export default SliderHomeProducts;
