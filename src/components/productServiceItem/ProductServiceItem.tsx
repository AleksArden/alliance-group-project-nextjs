'use client';

import { ProductServiceType } from 'types/dataTypeForFirebase';
import styles from './ProductServiceItem.module.scss';
import Image from 'next/image';
import Content from 'components/content/Content';

import MainButton from 'components/mainButton/mainButton';

import { useRouter } from 'next/navigation';
import { getNameForAdressBar } from 'helpers/functions';
import { Lang } from 'types/otherType';
import { useEffect, useState } from 'react';

interface IProps {
  product: ProductServiceType;
  locale: string;
}

const ProductServiceItem = ({ product, locale }: IProps) => {
  console.log(locale);
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

  const router = useRouter();
  const {
    imageURL,
    nameUK,
    sizeUK,
    nameEN,
    sizeEN,
    nameTR,
    sizeTR,
    descriptionUK,
    descriptionEN,
    descriptionTR,
  } = product;
  console.log("I'm Item, I'm client");
  const adressBarName = getNameForAdressBar(nameEN);

  const handleClick = () => {
    router.push(`/${locale}/products-services/${adressBarName}`);
  };

  return (
    <li className={styles.item}>
      <div className={styles.imageWrapper}>
        <Image
          src={imageURL}
          fill
          sizes="700px"
          alt="The product photo"
          loading="lazy"
          className={styles.image}
        />
      </div>
      <div className={styles.contentWrapper}>
        {locale === Lang.UK && (
          <>
            <p className={sizeUK ? styles.name : styles.nameWithoutSize}>
              {nameUK}
            </p>

            {sizeUK && <p className={styles.size}>{sizeUK}</p>}
            <div className={styles.textContainer}>
              <Content
                content={
                  sizeUK
                    ? descriptionUK.slice(0, 145) + ' . . .'
                    : descriptionUK.slice(0, 175) + ' . . .'
                }
              />
            </div>
          </>
        )}
        {locale === Lang.EN && (
          <>
            <p className={sizeEN ? styles.name : styles.nameWithoutSize}>
              {nameEN}
            </p>
            {sizeEN && <p className={styles.size}>{sizeEN}</p>}
            <div className={styles.textContainer}>
              <Content
                content={
                  sizeEN
                    ? descriptionEN.slice(0, 165) + ' . . .'
                    : descriptionEN.slice(0, 195) + ' . . .'
                }
              />
            </div>
          </>
        )}
        {locale === Lang.TR && (
          <>
            <p className={sizeTR ? styles.name : styles.nameWithoutSize}>
              {nameTR}
            </p>
            {sizeUK && <p className={styles.size}>{sizeTR}</p>}
            <div className={styles.textContainer}>
              <Content
                content={
                  sizeTR
                    ? descriptionTR.slice(0, 160) + ' . . .'
                    : descriptionTR.slice(0, 190) + ' . . .'
                }
              />
            </div>
          </>
        )}

        <div className={styles.btnWrapper}>
          <MainButton
            name={nameBtn}
            styleWrapperBtn={{
              width: 268,
              borderColor: '#5F391880',
            }}
            styleBtn={{ width: 260 }}
            type="button"
            onClick={handleClick}
          />
        </div>
      </div>
    </li>
  );
};
export default ProductServiceItem;
