import { Metadata } from 'next';

type RouteProps = {
  params: { locale: string };
  searchParams: { [key: string]: string | string[] | undefined };
};
export async function generateMetadata(props: RouteProps): Promise<Metadata> {
  const intl = await getIntl(props.params.locale);
  return {
    title: intl.formatMessage({ id: 'page.aboutCompany.head.title' }),
    description: 'Generated by create next app',
  };
}

import { getAllCards, getDataFromFirestore } from '@/firebase/getData';
import Image from 'next/image';
import Content from 'components/content/Content';
import styles from './aboutCompany.module.scss';

import HeroSection from 'components/heroSection/HeroSection';

import { AboutCompanyType, StaffType } from 'types/dataTypeForFirebase';

import { getIntl } from 'lib/intl';
import { Lang } from 'types/otherType';

type IProps = {
  params: { locale: string };
};

const AboutCompany = async ({ params: { locale } }: IProps) => {
  const intl = await getIntl(locale);

  const data = await getDataFromFirestore<AboutCompanyType>('aboutUs');
  // console.log('page about-us', data);
  const dataStaff = await getAllCards<StaffType>('staff');
  // console.log('staff', dataStaff);
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
          <ul className={styles.listText}>
            <li className={styles.textContainer}>
              {data?.textOurHistoryUK && locale === Lang.UK && (
                <>
                  <h3 className={styles.textTitle}>
                    {intl.formatMessage({ id: 'page.aboutUs.ourHistory' })}
                  </h3>
                  <Content content={data.textOurHistoryUK} />
                </>
              )}
              {data?.textOurHistoryEN && locale === Lang.EN && (
                <>
                  <h3 className={styles.textTitle}>
                    {intl.formatMessage({ id: 'page.aboutUs.ourHistory' })}
                  </h3>
                  <Content content={data.textOurHistoryEN} />
                </>
              )}
              {data?.textOurHistoryTR && locale === Lang.TR && (
                <>
                  <h3 className={styles.textTitle}>
                    {intl.formatMessage({ id: 'page.aboutUs.ourHistory' })}
                  </h3>
                  <Content content={data.textOurHistoryTR} />
                </>
              )}
            </li>
            <li className={styles.textContainer}>
              {data?.textOurMissionUK && locale === 'uk' && (
                <>
                  <h3 className={styles.textTitle}>
                    {intl.formatMessage({ id: 'page.aboutUs.ourMission' })}
                  </h3>
                  <Content content={data.textOurMissionUK} />
                </>
              )}
              {data?.textOurMissionEN && locale === 'en' && (
                <>
                  <h3 className={styles.textTitle}>
                    {intl.formatMessage({ id: 'page.aboutUs.ourMission' })}
                  </h3>
                  <Content content={data.textOurMissionEN} />
                </>
              )}
              {data?.textOurMissionTR && locale === 'tr' && (
                <>
                  <h3 className={styles.textTitle}>
                    {intl.formatMessage({ id: 'page.aboutUs.ourMission' })}
                  </h3>
                  <Content content={data.textOurMissionTR} />
                </>
              )}
            </li>
            <li className={styles.textContainer}>
              {data?.textOurTeamUK && locale === 'uk' && (
                <>
                  <h3 className={styles.textTitle}>
                    {intl.formatMessage({ id: 'page.aboutUs.ourTeam' })}
                  </h3>
                  <Content content={data.textOurTeamUK} />
                </>
              )}
              {data?.textOurTeamEN && locale === 'en' && (
                <>
                  <h3 className={styles.textTitle}>
                    {intl.formatMessage({ id: 'page.aboutUs.ourTeam' })}
                  </h3>
                  <Content content={data.textOurTeamEN} />
                </>
              )}
              {data?.textOurTeamTR && locale === 'tr' && (
                <>
                  <h3 className={styles.textTitle}>
                    {intl.formatMessage({ id: 'page.aboutUs.ourTeam' })}
                  </h3>
                  <Content content={data.textOurTeamTR} />
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
                        sizes="(max-width: 767px) 100vw, (max-width: 1239px) 50vw, 25vw"
                        alt="The photo of staff"
                        loading="lazy"
                        className={styles.image}
                      />
                    </div>
                    {locale === Lang.UK && (
                      <>
                        <h3 className={styles.staffTitle}>{nameUA}</h3>
                        <p className={styles.information}>{positionUA}</p>
                        <p className={styles.information}>{descriptionUA}</p>
                      </>
                    )}
                    {locale === Lang.EN && (
                      <>
                        <h3 className={styles.staffTitle}>{nameEN}</h3>
                        <p className={styles.information}>{positionEN}</p>
                        <p className={styles.information}>{descriptionEN}</p>
                      </>
                    )}
                    {locale === Lang.TR && (
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
        </div>
      </section>
    </>
  );
};
export default AboutCompany;
