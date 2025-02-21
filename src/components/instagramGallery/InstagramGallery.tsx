import { InstagramPostType, InstagramResponse } from 'types/otherType';
import styles from './InstagramGallery.module.scss';
import InstaFeed from './instaFeed/InstaFeed';
import { Suspense } from 'react';
import Loading from 'app/[locale]/(marketing)/loading';

async function getMediaFromInstagram(): Promise<InstagramResponse> {
  const fieldsName = 'id,caption,media_type,media_url';
  const url = `https://graph.facebook.com/v22.0/100984171886281
?fields=instagram_business_account&access_token=${process.env.INSTAGRAM_KEY}`;
  //   const url = `https://graph.instagram.com/100984171886281
  // /media?fields=${fieldsName}&limit=30&access_token=${process.env.INSTAGRAM_KEY}`;
  const res = await fetch(url, {
    next: { revalidate: 86400 },
  });
  if (!res.ok) {
    const errorText = await res.text();
    console.error(`Error fetching Instagram data: ${errorText}`);
    throw new Error('Failed to fetch data');
  }
  return res.json() as Promise<InstagramResponse>;
}

type IProps = {
  locale: string;
};

const InstagramGallery = async ({ locale }: IProps) => {
  const feeds = await getMediaFromInstagram();
  console.log('instagram>>>>>>>>>>>', feeds);

  return (
    <section className={styles.container}>
      <Suspense fallback={<Loading />}>
        {/* <ul className={styles.list}>
          {feeds &&
            feeds.data.map((feed: InstagramPostType) => (
              <InstaFeed key={feed.id} feed={feed} locale={locale} />
            ))}
        </ul> */}
      </Suspense>
    </section>
  );
};
export default InstagramGallery;
