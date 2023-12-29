import { ProductType, ServiceType } from 'types/dataTypeForFirebase';
import styles from './ProductServiceItem.module.scss';
import Image from 'next/image';
import Content from 'components/content/Content';

import MainButton from 'components/mainButton/mainButton';

import { getIntl } from 'lib/intl';

interface IProps {
  product: ProductType | ServiceType;
  locale: string;
}

const ProductServiceItem = async ({ product, locale }: IProps) => {
  const intl = await getIntl(locale);
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

  const shortDescriptionUK = descriptionUK.slice(0, 145) + ' . . .';
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
            <p className={styles.name}>{nameUK}</p>
            {sizeUK && <p className={styles.size}>{sizeUK}</p>}
            <div className={styles.textContainer}>
              <Content content={shortDescriptionUK} />
            </div>
          </>
        )}

        <div className={styles.btnWrapper}>
          <MainButton
            name={intl.formatMessage({ id: 'page.home.products-services.btn' })}
            styleWrapperBtn={{
              width: 268,
              borderColor: '#5F391880',
            }}
            styleBtn={{ width: 260 }}
            type="button"
          />
        </div>
      </div>
    </li>
  );
};
export default ProductServiceItem;
