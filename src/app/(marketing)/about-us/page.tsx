import { Metadata } from 'next';

import { getDataAboutUsFromFirestore } from '@/firebase/getData';
import Image from 'next/image';
import Content from 'components/content/Content';
import styles from './aboutUs.module.scss';
export const metadata: Metadata = {
  title: 'About Us | Alliance Group LLC',
  description: 'Generated by create next app',
};

export const revalidate = 3600;

const AboutUs = async () => {
  const data = await getDataAboutUsFromFirestore();
  // console.log('page about-us', data);
  return (
    <>
      <h2 style={{ textAlign: 'center' }}>{data?.title}</h2>

      {data?.imageURL && (
        <Image
          src={data?.imageURL}
          width={150}
          height={150}
          alt="The photo download"
        />
      )}
      {data?.content && (
        <div className={styles.wrapper}>
          <Content content={data.content} />
        </div>
      )}
    </>
  );
};
export default AboutUs;
