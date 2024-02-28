'use client';

/* eslint-disable @next/next/no-img-element */
import { Modal } from 'components/Modal/Modal';
import styles from './InstagramModal.module.scss';
import { InstagramPostType } from 'types/otherType';
import { useIsWideScreen } from 'hooks/useIsWideScreen';

type IProps = {
  locale: string;
  feed: InstagramPostType;
};

const InstagramModal = ({ feed, locale }: IProps) => {
  const [, , isMobileScreen] = useIsWideScreen();
  const { caption, media_type, media_url } = feed;
  let post: JSX.Element;

  switch (media_type) {
    case 'VIDEO':
      post = (
        <div className={styles.videoContainer}>
          <div className={styles.videoWrapper}>
            <video
              className={styles.video}
              src={media_url}
              controls
              playsInline
              loop
              preload="auto"
              autoPlay
            ></video>
          </div>

          <div className={styles.textContainer}>
            <div className={styles.modalHeader}></div>
            <div className={styles.textWrapper}>
              <p>{caption}</p>
            </div>
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
          <div className={styles.textContainer}>
            <div className={styles.modalHeader}></div>
            <div className={styles.textWrapper}>
              <p>{caption}</p>
            </div>
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
          <div className={styles.textContainer}>
            <div className={styles.modalHeader}></div>
            <div className={styles.textWrapper}>
              <p>{caption}</p>
            </div>
          </div>
        </div>
      );
      break;
  }
  return (
    <Modal
      route={'gallery'}
      locale={locale}
      isGalleryModal={true}
      isInstagramModal={isMobileScreen ? false : true}
    >
      {post}
    </Modal>
  );
};
export default InstagramModal;
