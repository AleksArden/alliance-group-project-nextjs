import styles from './InstaFeed.module.scss';
import Image from 'next/image';

const InstaFeed = ({ feed }: { feed: any }) => {
  const { id, caption, media_type, media_url, username, timestamp, permalink } =
    feed;

  let post;

  switch (media_type) {
    case 'VIDEO':
      post = (
        <div className={styles.imageWrapper}>
          <video
            src={media_url}
            width="600"
            height="600"
            controls
            playsInline
            loop
            preload="auto"
          ></video>
        </div>
      );
      break;
    case 'IMAGE':
      post = (
        <div className={styles.imageWrapper}>
          <Image
            src={media_url}
            fill
            sizes="600px"
            alt={caption}
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
            sizes="600px"
            alt={caption}
            loading="lazy"
            className={styles.image}
            unoptimized
          />
        </div>
      );
      break;
  }
  return <li>{post}</li>;
};
export default InstaFeed;
