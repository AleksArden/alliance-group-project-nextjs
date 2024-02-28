import { Metadata } from 'next';
import { getIntl } from 'lib/intl';
type RouteProps = {
  params: { locale: string };
  searchParams: { [key: string]: string | string[] | undefined };
};
export async function generateMetadata(props: RouteProps): Promise<Metadata> {
  const intl = await getIntl(props.params.locale);
  return {
    title: intl.formatMessage({ id: 'page.gallery.head.title' }),
    description: 'Generated by create next app',
  };
}

import styles from './Gallery.module.scss';
import InstagramGallery from 'components/instagramGallery/InstagramGallery';
import { getDataFromFirestore } from '@/firebase/getData';
import HeroSection from 'components/heroSection/HeroSection';
import { InstagramResponse, Lang } from 'types/otherType';
import { GalleryType } from 'types/dataTypeForFirebase';

async function getMediaFromInstagram(): Promise<InstagramResponse> {
  const fieldsName = 'id,caption,media_type,media_url';
  const url = `https://graph.instagram.com/me/media?fields=${fieldsName}&limit=30&access_token=${process.env.INSTAGRAM_KEY}`;
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
  const data = await getDataFromFirestore<GalleryType>('galleryPage');
  const feeds = await getMediaFromInstagram();
  // console.log('instagram', feeds);
  // console.log('gallery', data);

  return (
    <>
      <HeroSection
        backgroundImage={{
          desktop: data?.backgroundImageDesktop,
          tablet: data?.backgroundImageTablet,
          mobile: data?.backgroundImageMobile,
        }}
        title={
          locale === Lang.UK
            ? data?.titleUK
            : undefined || locale === Lang.EN
            ? data?.titleEN
            : undefined || locale === Lang.TR
            ? data?.titleTR
            : undefined
        }
        subtitle={
          locale === Lang.UK
            ? data?.subtitleUK
            : undefined || locale === Lang.EN
            ? data?.subtitleEN
            : undefined || locale === Lang.TR
            ? data?.subtitleTR
            : undefined
        }
      />

      <section className={styles.section}>
        <div className={styles.container}>
          <InstagramGallery feeds={feeds.data} locale={locale} />
        </div>
      </section>
    </>
  );
};
export default Gallery;
