import { InstagramPostType } from 'types/otherType';
import styles from './InstagramGallery.module.scss';
import InstaFeed from './instaFeed/InstaFeed';

type IProps = {
  locale: string;
  feeds: InstagramPostType[];
};

const InstagramGallery = async ({ locale, feeds }: IProps) => {
  // console.log(feeds);
  return (
    <section className={styles.container}>
      <ul className={styles.list}>
        {feeds &&
          feeds.map((feed: InstagramPostType) => (
            <InstaFeed key={feed.id} feed={feed} locale={locale} />
          ))}
      </ul>
    </section>
  );
};
export default InstagramGallery;
