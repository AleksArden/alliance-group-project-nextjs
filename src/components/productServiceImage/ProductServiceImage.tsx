'use client';
import { useSearchParams } from 'next/navigation';
import styles from './ProductServiceImage.module.scss';
import { useEffect } from 'react';
import Link from 'next/link';
import { GalleryImageURLType } from 'types/dataTypeForFirebase';
import Image from 'next/image';

interface IProps {
  props: GalleryImageURLType;
  locale: string;
}

const ProductServiceImage = ({ props, locale }: IProps) => {
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
          href={`/${locale}/gallery/?modal=true&image=${imageName}`}
          scroll={false}
        >
          <div className={styles.imageWrapper}>
            <Image
              src={imageURL}
              fill
              sizes="400px"
              alt="Image  of Product"
              loading="lazy"
              className={styles.image}
            />
          </div>
        </Link>
      </li>
      {/* {showModal && currentImage === imageName && (
        // <InstagramModal feed={feed} locale={locale} />
      )} */}
    </>
  );
};
export default ProductServiceImage;
