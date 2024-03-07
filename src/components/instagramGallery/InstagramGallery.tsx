// 'use client';

import { InstagramPostType } from 'types/otherType';
import styles from './InstagramGallery.module.scss';
import InstaFeed from './instaFeed/InstaFeed';
import { Suspense } from 'react';
import Loading from 'app/[locale]/(marketing)/loading';
// import { useEffect, useState } from 'react';
// import { addDataToFirestore } from '@/firebase/addData';
// import firebase_app from '@/firebase/config';
// import { doc, getFirestore, onSnapshot } from 'firebase/firestore';
// import { revalidatePath } from 'next/cache';
// const db = getFirestore(firebase_app);

type IProps = {
  locale: string;
  feeds: InstagramPostType[];
  // posts: InstagramPostType[] | undefined;
};

const InstagramGallery = ({ locale, feeds }: IProps) => {
  console.log(feeds);
  // console.log('posts', posts);

  // useEffect(() => {
  //   (async () => {
  //     await addDataToFirestore<InstagramResponse>(
  //       'contentForPages',
  //       'galleryInstagram',
  //       feeds
  //     );
  //   })();
  //   // revalidatePath('/[locale]/(marketing)/gallery', 'page');
  // }, [feeds]);

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
