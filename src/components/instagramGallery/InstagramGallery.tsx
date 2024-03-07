import { InstagramPostType } from 'types/otherType';
import styles from './InstagramGallery.module.scss';
import InstaFeed from './instaFeed/InstaFeed';
import { Suspense } from 'react';
import Loading from 'app/[locale]/(marketing)/loading';

type IProps = {
  locale: string;
  feeds: InstagramPostType[];
};

const InstagramGallery = ({ locale, feeds }: IProps) => {
  console.log(feeds);

  return (
    <section className={styles.container}>
      <Suspense fallback={<Loading />}>
        <ul className={styles.list}>
          {feeds &&
            feeds.map((feed: InstagramPostType) => (
              <InstaFeed key={feed.id} feed={feed} locale={locale} />
            ))}
        </ul>
      </Suspense>
    </section>
  );
};
export default InstagramGallery;
