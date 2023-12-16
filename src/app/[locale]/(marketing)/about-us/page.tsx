import { Metadata } from 'next';

import { getAllStaff, getDataAboutUsFromFirestore } from '@/firebase/getData';
import Image from 'next/image';
import Content from 'components/content/Content';
import styles from './aboutUs.module.scss';

import HeroSection from 'components/heroSection/HeroSection';

import { StaffType } from 'types/dataTypeForFirebase';
import Header from 'components/header/Header';
import Footer from 'components/footer/Footer';

import { getIntl } from 'lib/intl';
export const metadata: Metadata = {
  title: 'About Us | Alliance Group LLC',
  description: 'Generated by create next app',
};
type IProps = {
  params: { locale: string };
};
const AboutUs = async ({ params: { locale } }: IProps) => {
  const intl = await getIntl(locale);
  console.log('locale-ABOUT-US', locale);
  const data = await getDataAboutUsFromFirestore();
  // console.log('page about-us', data);
  const dataStaff = await getAllStaff();
  // console.log('staff', dataStaff);
  return (
    <>
      {/* <Header color="#5f3918" /> */}
      {/* <div className={styles.wrapper}> */}
      {locale === 'uk' && (
        <HeroSection
          backgroundImage={data?.backgroundImageDesktop}
          title={data?.titleUK}
          subtitle={data?.subtitleUK}
          initialAnimation={-2300}
        />
      )}
      {locale === 'en' && (
        <HeroSection
          backgroundImage={data?.backgroundImageDesktop}
          title={data?.titleEN}
          subtitle={data?.subtitleEN}
          initialAnimation={-3130}
        />
      )}
      {locale === 'tr' && (
        <HeroSection
          backgroundImage={data?.backgroundImageDesktop}
          title={data?.titleTR}
          subtitle={data?.subtitleTR}
          initialAnimation={-2520}
        />
      )}

      <section className={styles.container}>
        <ul className={styles.listText}>
          <li className={styles.textContainer}>
            {data?.textOurHistoryUK && locale === 'uk' && (
              <>
                <h3 className={styles.textTitle}>
                  {intl.formatMessage({ id: 'page.aboutUs.ourHistory' })}
                </h3>
                <Content content={data?.textOurHistoryUK} />
              </>
            )}
            {data?.textOurHistoryEN && locale === 'en' && (
              <>
                <h3 className={styles.textTitle}>
                  {intl.formatMessage({ id: 'page.aboutUs.ourHistory' })}
                </h3>
                <Content content={data?.textOurHistoryEN} />
              </>
            )}
            {data?.textOurHistoryTR && locale === 'tr' && (
              <>
                <h3 className={styles.textTitle}>
                  {intl.formatMessage({ id: 'page.aboutUs.ourHistory' })}
                </h3>
                <Content content={data?.textOurHistoryTR} />
              </>
            )}
          </li>
          <li className={styles.textContainer}>
            {data?.textOurMissionUK && locale === 'uk' && (
              <>
                <h3 className={styles.textTitle}>
                  {intl.formatMessage({ id: 'page.aboutUs.ourMission' })}
                </h3>
                <Content content={data?.textOurMissionUK} />
              </>
            )}
            {data?.textOurMissionEN && locale === 'en' && (
              <>
                <h3 className={styles.textTitle}>
                  {intl.formatMessage({ id: 'page.aboutUs.ourMission' })}
                </h3>
                <Content content={data?.textOurMissionEN} />
              </>
            )}
            {data?.textOurMissionTR && locale === 'tr' && (
              <>
                <h3 className={styles.textTitle}>
                  {intl.formatMessage({ id: 'page.aboutUs.ourMission' })}
                </h3>
                <Content content={data?.textOurMissionTR} />
              </>
            )}
          </li>
          <li className={styles.textContainer}>
            {data?.textOurTeamUK && locale === 'uk' && (
              <>
                <h3 className={styles.textTitle}>
                  {intl.formatMessage({ id: 'page.aboutUs.ourTeam' })}
                </h3>
                <Content content={data?.textOurTeamUK} />
              </>
            )}
            {data?.textOurTeamEN && locale === 'en' && (
              <>
                <h3 className={styles.textTitle}>
                  {intl.formatMessage({ id: 'page.aboutUs.ourTeam' })}
                </h3>
                <Content content={data?.textOurTeamEN} />
              </>
            )}
            {data?.textOurTeamTR && locale === 'tr' && (
              <>
                <h3 className={styles.textTitle}>
                  {intl.formatMessage({ id: 'page.aboutUs.ourTeam' })}
                </h3>
                <Content content={data?.textOurTeamTR} />
              </>
            )}
          </li>
        </ul>
        {dataStaff && (
          <ul className={styles.staffContainer}>
            {dataStaff.map(
              ({
                id,
                imageURL,
                nameUA,
                positionUA,
                descriptionUA,
                nameEN,
                positionEN,
                descriptionEN,
                nameTR,
                positionTR,
                descriptionTR,
              }: StaffType) => (
                <li key={id} className={styles.staffItem}>
                  <div className={styles.imageWrapper}>
                    <Image
                      src={imageURL}
                      fill
                      sizes="280px"
                      alt="The photo of staff"
                      priority
                      className={styles.image}
                    />
                  </div>
                  {locale === 'uk' && (
                    <>
                      <h3 className={styles.staffTitle}>{nameUA}</h3>
                      <p className={styles.information}>{positionUA}</p>
                      <p className={styles.information}>{descriptionUA}</p>
                    </>
                  )}
                  {locale === 'en' && (
                    <>
                      <h3 className={styles.staffTitle}>{nameEN}</h3>
                      <p className={styles.information}>{positionEN}</p>
                      <p className={styles.information}>{descriptionEN}</p>
                    </>
                  )}
                  {locale === 'tr' && (
                    <>
                      <h3 className={styles.staffTitle}>{nameTR}</h3>
                      <p className={styles.information}>{positionTR}</p>
                      <p className={styles.information}>{descriptionTR}</p>
                    </>
                  )}
                </li>
              )
            )}
          </ul>
        )}
      </section>
      {/* <Footer color="#5f3918" /> */}
    </>
  );
};
export default AboutUs;
//https://alliance-group-project-nextjs.vercel.app/tr
