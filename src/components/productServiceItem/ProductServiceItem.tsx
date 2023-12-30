'use client';

import { ProductType, ServiceType } from 'types/dataTypeForFirebase';
import styles from './ProductServiceItem.module.scss';
import Image from 'next/image';
import Content from 'components/content/Content';
import { FormattedMessage } from 'react-intl';
import MainButton from 'components/mainButton/mainButton';
import LangContainerForClientComponent from 'components/langContainerForClientComponent/LangContainerForClientComponent';
import { useRouter } from 'next/navigation';

interface IProps {
  product: ProductType | ServiceType;
  locale: string;
}

const ProductServiceItem = async ({ product, locale }: IProps) => {
  const router = useRouter();
  const {
    id,
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
  const handleClick = () => {
    router.push(`/${locale}/products-services/${nameEN}`);
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
        {locale === 'uk' && (
          <>
            <p className={sizeUK ? styles.name : styles.nameWithoutSizeUK}>
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
        {locale === 'en' && (
          <>
            <p className={sizeEN ? styles.name : styles.nameWithoutSizeUK}>
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
        {locale === 'tr' && (
          <>
            <p className={sizeTR ? styles.name : styles.nameWithoutSizeUK}>
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
          <LangContainerForClientComponent locale={locale}>
            <div>
              <MainButton
                name={<FormattedMessage id="page.home.products-services.btn" />}
                styleWrapperBtn={{
                  width: 268,
                  borderColor: '#5F391880',
                }}
                styleBtn={{ width: 260 }}
                type="button"
                onClick={handleClick}
              />
            </div>
          </LangContainerForClientComponent>
        </div>
      </div>
    </li>
  );
};
export default ProductServiceItem;
