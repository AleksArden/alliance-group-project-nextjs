import { Metadata } from 'next';
import { getIntl } from 'lib/intl';
export const metadata: Metadata = {
  title: 'Gallery | Alliance Group LLC',
  description: 'Generated by create next app',
};

import styles from './Gallery.module.scss';
import InstagramGallery from 'components/instagramGallery/InstagramGallery';

const getMediaFromInstagram = async () => {
  const url = `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,username,timestamp,permalink&access_token=${process.env.INSTAGRAM_KEY}`;
  const res = await fetch(url, {
    next: { revalidate: 86400 },
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
};

type IProps = {
  params: { locale: string };
};

const Gallery = async ({ params: { locale } }: IProps) => {
  const feed = await getMediaFromInstagram();
  // console.log('instagramm', feed.data);
  // const intl = await getIntl(locale);

  return (
    <>
      {/* <h2>Gallery</h2> */}
      <InstagramGallery media={feed.data} />
    </>
  );
};
export default Gallery;
