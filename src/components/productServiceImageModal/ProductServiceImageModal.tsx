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
    <Modal
      route={`products-services/${slug}`}
      locale={locale}
      isGalleryModal={true}
    >
      <div className={styles.imageContainer}>
        <div className={styles.imageWrapper}>
          <Image
            src={props.imageURL}
            fill
            sizes="(max-width: 767px) 400px,(max-width: 1239px) 600px, 800px"
            alt="Image  of Product"
            priority
            className={styles.image}
          />
        </div>
      </div>
    </Modal>
  );
};
export default ProductServiceImageModal;
