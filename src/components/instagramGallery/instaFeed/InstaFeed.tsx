'use client';

import Link from 'next/link';
import styles from './InstaFeed.module.scss';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

import InstagramModal from 'components/instagramModal/InstagramModal';
import { useEffect } from 'react';
import { InstagramPostType } from 'types/otherType';

type IProps = {
  locale: string;
  feed: InstagramPostType;
};

const InstaFeed = ({ feed, locale }: IProps) => {
  const searchParams = useSearchParams();
  const showModal = searchParams.has('modal');
  const currentImage = searchParams.get('image');
  const { id, media_type, media_url } = feed;
  // console.log('feed', feed);

  useEffect(() => {
    showModal
      ? (document.body.style.overflow = 'hidden')
      : (document.body.style.overflow = 'auto');
  }, [showModal]);

  let post;

  switch (media_type) {
    case 'VIDEO':
      post = (
        <div className={styles.imageWrapper}>
          <video
            src={media_url}
            width="400"
            height="400"
            className={styles.video}
          ></video>
          <div className={styles.iconVideo}>VIDEO</div>
        </div>
      );
      break;
    case 'IMAGE':
      post = (
        <div className={styles.imageWrapper}>
          <Image
            src={media_url}
            fill
            sizes="400px"
            alt="Image Instagram of Alliance Group"
            loading="lazy"
            className={styles.image}
            unoptimized
          />
        </div>
      );
      break;

    default:
      post = (
        <div className={styles.imageWrapper}>
          <Image
            src={media_url}
            fill
            sizes="400px"
            alt="Image Instagram of Alliance Group"
            loading="lazy"
            className={styles.image}
            unoptimized
          />
        </div>
      );
      break;
  }

  return (
    <>
      <li className={styles.item}>
        <Link
          href={`/${locale}/gallery/?modal=true&image=${id}`}
          scroll={false}
        >
          {post}
        </Link>
      </li>
      {showModal && currentImage === id && (
        <InstagramModal feed={feed} locale={locale} />
      )}
    </>
  );
};
export default InstaFeed;
