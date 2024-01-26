import { Metadata } from 'next';
import { getIntl } from 'lib/intl';
export const metadata: Metadata = {
  title: 'Gallery | Alliance Group LLC',
  description: 'Generated by create next app',
};

import styles from './Gallery.module.scss';
import InstagramGallery from 'components/instagramGallery/InstagramGallery';
import { getDataFromFirestore } from '@/firebase/getData';
import HeroSection from 'components/heroSection/HeroSection';
import { InstagramResponse } from 'types/otherType';
import { GalleryType } from 'types/dataTypeForFirebase';

async function getMediaFromInstagram(): Promise<InstagramResponse> {
  const fieldsName = 'id,caption,media_type,media_url';
  const url = `https://graph.instagram.com/me/media?fields=${fieldsName}&limit=66&access_token=${process.env.INSTAGRAM_KEY}`;
  const res = await fetch(url, {
    next: { revalidate: 86400 },
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json() as Promise<InstagramResponse>;
}

type IProps = {
  params: { locale: string };
};

const Gallery = async ({ params: { locale } }: IProps) => {
  const intl = await getIntl(locale);
  const data = await getDataFromFirestore<GalleryType>('gallery');
  const feeds = await getMediaFromInstagram();
  // console.log('instagram', feeds);

  return (
    <>
      {locale === 'uk' && (
        <HeroSection
          backgroundImage={data?.backgroundImageDesktop}
          title={data?.titleUK}
          subtitle={data?.subtitleUK}
        />
      )}
      {locale === 'en' && (
        <HeroSection
          backgroundImage={data?.backgroundImageDesktop}
          title={data?.titleEN}
          subtitle={data?.subtitleEN}
        />
      )}
      {locale === 'tr' && (
        <HeroSection
          backgroundImage={data?.backgroundImageDesktop}
          title={data?.titleTR}
          subtitle={data?.subtitleTR}
        />
      )}

      <section className={styles.container}>
        <h2 className={styles.title}>
          {intl.formatMessage({ id: 'page.gallery.title' })}
        </h2>
        <InstagramGallery feeds={feeds.data} locale={locale} />
      </section>
    </>
  );
};
export default Gallery;
