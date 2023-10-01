import { Metadata } from 'next';

import { getAllStaff, getDataAboutUsFromFirestore } from '@/firebase/getData';
import Image from 'next/image';
import Content from 'components/content/Content';
import styles from './aboutUs.module.scss';

import HeroSection from 'components/heroSection/HeroSection';

import { StaffType } from 'types/dataTypeForFirebase';
export const metadata: Metadata = {
  title: 'About Us | Alliance Group LLC',
  description: 'Generated by create next app',
};

export const revalidate = 18000;

const AboutUs = async () => {
  const data = await getDataAboutUsFromFirestore();
  // console.log('page about-us', data);
  const dataStaff = await getAllStaff();

  return (
    <>
      <HeroSection
        backgroundImage={data?.backgroundImageDesktop}
        title={data?.title}
        subtitle={data?.subtitle}
      />
      <section className={styles.container}>
        <ul className={styles.listText}>
          <li className={styles.textContainer}>
            <h3 className={styles.textTitle}>Наша Історія</h3>
            {data?.textOurHistory && <Content content={data?.textOurHistory} />}
          </li>
          <li className={styles.textContainer}>
            <h3 className={styles.textTitle}>Наша Місія</h3>
            {data?.textOurMission && <Content content={data?.textOurMission} />}
          </li>
          <li className={styles.textContainer}>
            <h3 className={styles.textTitle}>Наша Команда</h3>
            {data?.textOurTeam && <Content content={data?.textOurTeam} />}
          </li>
        </ul>
        {dataStaff && (
          <ul className={styles.staffContainer}>
            {dataStaff.map(
              ({
                order,
                photoStaff,
                nameUA,
                positionUA,
                descriptionUA,
              }: StaffType) => (
                <li key={order} className={styles.staffItem}>
                  <div className={styles.imageWrapper}>
                    <Image
                      src={photoStaff}
                      fill
                      sizes="100vw"
                      alt="The staff photo"
                      priority
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <h3 className={styles.staffTitle}>{nameUA}</h3>
                  <p className={styles.information}>{positionUA}</p>
                  <p className={styles.information}>{descriptionUA}</p>
                </li>
              )
            )}
          </ul>
        )}
      </section>
    </>
  );
};
export default AboutUs;
