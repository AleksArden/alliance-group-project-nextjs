import styles from './InstaFeed.module.scss';
import Image from 'next/image';

const InstaFeed = ({ feed }: { feed: any }) => {
  const { id, caption, media_type, media_url, username, timestamp, permalink } =
    feed;

  let post;

  switch (media_type) {
    case 'VIDEO':
      post = (
        <>
          <div className={styles.imageWrapper}>
            <video
              src={media_url}
              width="100%"
              height="300px"
              controls
              playsInline
              loop
              preload="auto"
            ></video>
          </div>
          <div className={styles.textWrapper}>
            <p>{caption}</p>
          </div>
        </>
      );
      break;
    case 'IMAGE':
      post = (
        <>
          <div className={styles.imageWrapper}>
            <Image
              src={media_url}
              fill
              sizes="25vw"
              alt={caption}
              loading="lazy"
              className={styles.image}
              unoptimized
            />
          </div>
          <div className={styles.textWrapper}>
            <p>{caption}</p>
          </div>
        </>
      );
      break;

    default:
      post = (
        <>
          <div className={styles.imageWrapper}>
            <Image
              src={media_url}
              fill
              sizes="25vw"
              alt={caption}
              loading="lazy"
              className={styles.image}
              unoptimized
            />
          </div>
          <div className={styles.textWrapper}>
            <p>{caption}</p>
          </div>
        </>
      );
      break;
  }
  return <li className={styles.item}>{post}</li>;
};
export default InstaFeed;
