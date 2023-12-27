'use client';

import Link from 'next/link';
import styles from './InstaFeed.module.scss';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { Modal } from 'components/Modal/Modal';
import InstagramModal from 'components/instagramModal/InstagramModal';

const InstaFeed = ({ feed }: { feed: any }) => {
  const searchParams = useSearchParams();
  const showModal = searchParams.has('modal');
  const currentImage = searchParams.get('image');
  const { id, caption, media_type, media_url } = feed;
  // console.log('feed', feed);
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
        <Link href={`/gallery/?modal=true&image=${id}`}>{post}</Link>
      </li>
      {showModal && currentImage === id && <InstagramModal feed={feed} />}
    </>
  );
};
export default InstaFeed;
