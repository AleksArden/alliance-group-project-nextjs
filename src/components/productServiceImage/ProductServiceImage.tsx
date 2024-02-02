'use client';
import { useSearchParams } from 'next/navigation';
import styles from './ProductServiceImage.module.scss';
import { useEffect } from 'react';
import Link from 'next/link';
import { GalleryImageURLType } from 'types/dataTypeForFirebase';
import Image from 'next/image';
import ProductServiceImageModal from 'components/productServiceImageModal/ProductServiceImageModal';

interface IProps {
  props: GalleryImageURLType;
  locale: string;
  slug: string;
}

const ProductServiceImage = ({ props, locale, slug }: IProps) => {
  const { imageName, imageURL } = props;
  const searchParams = useSearchParams();
  const showModal = searchParams.has('modal');
  const currentImage = searchParams.get('image');

  useEffect(() => {
    showModal
      ? (document.body.style.overflow = 'hidden')
      : (document.body.style.overflow = 'auto');
  }, [showModal]);

  return (
    <>
      <li className={styles.item}>
        <Link
          href={`/${locale}/products-services/${slug}/?modal=true&image=${imageName}`}
          scroll={false}
        >
          <div className={styles.imageWrapper}>
            <Image
              src={imageURL}
              fill
              sizes="(max-width: 767px) 100vw, (max-width: 1191px) 50vw, 33vw"
              alt="Image  of Product"
              loading="lazy"
              className={styles.image}
            />
          </div>
        </Link>
      </li>
      {showModal && currentImage === imageName && (
        <ProductServiceImageModal props={props} locale={locale} slug={slug} />
      )}
    </>
  );
};
export default ProductServiceImage;
