/* eslint-disable @next/next/no-img-element */
import { Modal } from 'components/Modal/Modal';
import styles from './InstagramModal.module.scss';
import Image from 'next/image';

const InstagramModal = ({ feed }: { feed: any }) => {
  const { id, caption, media_type, media_url, username, timestamp, permalink } =
    feed;
  let post;

  switch (media_type) {
    case 'VIDEO':
      post = (
        <div className={styles.videoContainer}>
          <div className={styles.videoWrapper}>
            <video
              src={media_url}
              width="auto"
              height="100%"
              controls
              playsInline
              loop
              preload="auto"
              autoPlay
            ></video>
          </div>
          <div className={styles.textWrapper}>
            <p>{caption}</p>
          </div>
        </div>
      );
      break;
    case 'IMAGE':
      post = (
        <div className={styles.imageContainer}>
          <div className={styles.imageWrapper}>
            <img
              src={media_url}
              alt="Image Instagram of Alliance Group"
              className={styles.image}
            />
          </div>
          <div className={styles.textWrapper}>
            <p>{caption}</p>
          </div>
        </div>
      );
      break;

    default:
      post = (
        <div className={styles.imageContainer}>
          <div className={styles.imageWrapper}>
            <img
              src={media_url}
              alt="Image Instagram of Alliance Group"
              className={styles.image}
            />
          </div>
          <div className={styles.textWrapper}>
            <p>{caption}</p>
          </div>
        </div>
      );
      break;
  }
  return <Modal route={'gallery'}>{post}</Modal>;
};
export default InstagramModal;