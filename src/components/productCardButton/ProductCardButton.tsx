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
    <div className={styles.container}>
      <div className={styles.btnWrapper}>
        {isMobileScreen && (
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
        )}
        {isTabletScreen && (
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
        )}
        {isDesktopScreen && (
          <MainButton
            name={nameBtn}
            styleWrapperBtn={{
              width: 237,
              borderColor: '#5f391880',
            }}
            styleBtn={{ width: 229 }}
            type="button"
          />
        )}
      </div>
      <Link
        className={styles.btnLeft}
        href={`/${locale}/products-services/${getNameForAdressBar(
          previousProduct.nameEN
        )}`}
      >
        <div className={styles.circle}>
          <div className={styles.arrowLeft}></div>
        </div>
        <span>{products && products[0]}</span>
      </Link>

      <Link
        href={`/${locale}/products-services/${getNameForAdressBar(
          nextProduct.nameEN
        )}`}
        className={styles.btnRight}
      >
        <span className={styles.nameRight}>{products && products[1]}</span>
        <div className={styles.circle}>
          <div className={styles.arrowRight}></div>
        </div>
      </Link>
    </div>
  );
};
export default ProductCardButton;
