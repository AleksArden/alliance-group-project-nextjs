import { Modal } from 'components/Modal/Modal';
import styles from './ProductServiceImageModal.module.scss';

import { GalleryImageURLType } from 'types/dataTypeForFirebase';
import Image from 'next/image';

type IProps = {
  locale: string;
  props: GalleryImageURLType;
  slug: string;
};

const ProductServiceImageModal = ({ props, locale, slug }: IProps) => {
  return (
    <Modal route={`products-services/${slug}`} locale={locale}>
      <div className={styles.imageWrapper}>
        <Image
          src={props.imageURL}
          fill
          sizes="800px"
          alt="Image  of Product"
          priority
          className={styles.image}
        />
      </div>
    </Modal>
  );
};
export default ProductServiceImageModal;
