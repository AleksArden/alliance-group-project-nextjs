'use client';

import { useIsWideScreen } from 'hooks/useIsWideScreen';
import styles from './ProductCardButton.module.scss';
import { useEffect, useState } from 'react';
import { Lang } from 'types/otherType';
import MainButton from 'components/mainButton/mainButton';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ProductServiceType } from 'types/dataTypeForFirebase';
import { getNameForAdressBar } from 'helpers/functions';

interface IProps {
  locale: string;
  previousProduct: ProductServiceType;
  nextProduct: ProductServiceType;
}

const ProductCardButton = ({
  locale,
  previousProduct,
  nextProduct,
}: IProps) => {
  const router = useRouter();
  const [isDesktopScreen, isTabletScreen, isMobileScreen] = useIsWideScreen();
  const [nameBtn, setNameBtn] = useState('');
  const [products, setProducts] = useState<string[]>();

  useEffect(() => {
    switch (locale) {
      case Lang.UK:
        setNameBtn('Замовити');
        setProducts([previousProduct.nameUK, nextProduct.nameUK]);
        break;
      case Lang.EN:
        setNameBtn('Order');
        setProducts([previousProduct.nameEN, nextProduct.nameEN]);
        break;
      default:
        setNameBtn('Emir');
        setProducts([previousProduct.nameTR, nextProduct.nameTR]);
        break;
    }
  }, [locale, previousProduct, nextProduct]);

  const handleClick = () => {
    router.push(`/${locale}/contacts#form-id`);
  };

  return (
    <>
      {isMobileScreen && (
        <div className={styles.container}>
          <MainButton
            name={nameBtn}
            styleWrapperBtn={{
              width: 176,
              height: 62,
              borderRadius: '32px 0 59px 32px',
              borderColor: '#5f391880',
            }}
            styleBtn={{
              width: 168,
              height: 54,
              borderRadius: '27px 0 54px 27px',
            }}
            type="button"
            onClick={handleClick}
          />

          <Link
            className={styles.btnLeft}
            href={`/${locale}/products-services/${getNameForAdressBar(
              previousProduct.nameEN
            )}`}
          >
            <div className={styles.arrowLeft}></div>
            {products && products[0]}
          </Link>
          <Link
            className={styles.btnRight}
            href={`/${locale}/products-services/${getNameForAdressBar(
              nextProduct.nameEN
            )}`}
          >
            {products && products[1]}
            <div className={styles.arrowRight}></div>
          </Link>
        </div>
      )}
      {isTabletScreen && (
        <div className={styles.container}>
          <Link
            className={styles.btnLeft}
            href={`/${locale}/products-services/${getNameForAdressBar(
              previousProduct.nameEN
            )}`}
          >
            <div className={styles.arrowLeft}></div>
            {products && products[0]}
          </Link>
          <MainButton
            name={nameBtn}
            styleWrapperBtn={{
              width: 171,
              height: 62,
              borderRadius: '32px 0 59px 32px',
              borderColor: '#5f391880',
            }}
            styleBtn={{
              width: 163,
              height: 54,
              borderRadius: '27px 0 54px 27px',
            }}
            type="button"
            onClick={handleClick}
          />

          <Link
            className={styles.btnRight}
            href={`/${locale}/products-services/${getNameForAdressBar(
              nextProduct.nameEN
            )}`}
          >
            {products && products[1]}
            <div className={styles.arrowRight}></div>
          </Link>
        </div>
      )}
    </>
  );
};
export default ProductCardButton;
