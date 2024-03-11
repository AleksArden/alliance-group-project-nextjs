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
import { Lang } from 'types/otherType';
import { GalleryType } from 'types/dataTypeForFirebase';

type IProps = {
  params: { locale: string };
};

const Gallery = async ({ params: { locale } }: IProps) => {
  const data = await getDataFromFirestore<GalleryType>('galleryPage');

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
          <InstagramGallery locale={locale} />
        </div>
      </section>
    </>
  );
};
export default Gallery;
