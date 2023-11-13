'use client';

import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';

import styles from './SliderHomeServices.module.scss';
import Image from 'next/image';
import MainButton from 'components/mainButton/mainButton';
import { getSliderSettings } from 'helpers/functions';
import { ServiceType } from 'types/dataTypeForFirebase';

const SliderHomeServices = ({ services }: { services: ServiceType[] }) => {
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
      }}
    >
      {services.map(({ id, imageURL, nameUA }) => (
        <SplideSlide key={id} className={styles.productWrapper}>
          <div className={styles.imageWrapper}>
            <Image
              src={imageURL}
              fill
              sizes="100vw"
              alt="The product photo"
              priority
              className={styles.image}
            />
            <p className={styles.name}>{nameUA}</p>

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
export default SliderHomeServices;
