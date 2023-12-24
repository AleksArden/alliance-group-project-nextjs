import styles from './InstaFeed.module.scss';
import Image from 'next/image';

const InstaFeed = ({ feed }: { feed: any }) => {
  const { id, caption, media_type, media_url, username, timestamp, permalink } =
    feed;

  let post;

  switch (media_type) {
    case 'VIDEO':
      post = (
        <video
          src={media_url}
          width="600"
          height="600"
          controls
          playsInline
          loop
          preload="auto"
        ></video>
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
            priority
            className={styles.image}
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
            priority
            className={styles.image}
          />
        </div>
      );
      break;
  }
  return <li>{post}</li>;
};
export default InstaFeed;
