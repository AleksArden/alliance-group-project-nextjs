import styles from './InstagramGallery.module.scss';
import InstaFeed from './instaFeed/InstaFeed';
import { getIntl } from 'lib/intl';

type IProps = {
  locale: string;
  feeds: any;
};

const InstagramGallery = async ({ locale, feeds }: IProps) => {
  const intl = await getIntl(locale);
  console.log(feeds);
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        {intl.formatMessage({ id: 'page.gallery.title' })}
      </h2>
      <ul className={styles.list}>
        {feeds &&
          feeds.map((feed: any) => <InstaFeed key={feed.id} feed={feed} />)}
      </ul>
    </div>
  );
};
export default InstagramGallery;
