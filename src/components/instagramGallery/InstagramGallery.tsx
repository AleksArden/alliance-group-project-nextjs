'use client';
import Image from 'next/image';
import styles from './InstagramGallery.module.scss';

const InstagramGallery = ({ media }: { media: any }) => {
  //   console.log(media);
  return (
    <>
      <h2>Instagram Gallery</h2>
      <ul>
        {media &&
          media.map(
            ({ id, caption, media_type, media_url, permalink }: any) => {
              if (media_type === 'IMAGE') {
                return (
                  <li key={id}>
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
                  </li>
                );
              } else {
                return (
                  <li key={id}>
                    <video
                      src={media_url}
                      // poster="https://images.pexels.com/photos/595804/pexels-photo-595804.jpeg?w=640"
                      width="640"
                      controls
                      loop
                      preload="auto"
                    ></video>
                  </li>
                );
              }
            }
          )}
      </ul>
    </>
  );
};
export default InstagramGallery;
