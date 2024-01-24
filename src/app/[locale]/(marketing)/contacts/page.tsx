import { getDataFromFirestore } from '@/firebase/getData';
import { Metadata, ResolvingMetadata } from 'next';
import { getIntl } from 'lib/intl';
// type RouteProps = {
//   params: { locale: string };
//   searchParams: { [key: string]: string | string[] | undefined };
// };
// export async function generateMetadata(
//   props: RouteProps,
//   parent: ResolvingMetadata
// ): Promise<Metadata> {
//   const intl = await getIntl(props.params.locale);
//   return {
//     title: intl.formatMessage({ id: 'page.contacts.head.title' }),
//     description: 'Generated by create next app',
//     alternates: {
//       canonical: 'https://example.com',
//       languages: {
//         uk: 'http://example.com/uk',
//         en: 'http://example.com',
//         tr: 'http://example.com/tr',
//         'x-default': 'http://example.com',
//       },
//     },
//   };
// }
export const metadata: Metadata = {
  title: 'Contacts | Alliance Group LLC',
  description: 'Generated by create next app',
};
import styles from './Contacts.module.scss';

import Content from 'components/content/Content';
import Image from 'next/image';
import image1 from '../../../../../public/images/Contacts/Desktop/Contacts-image-1-desk.jpg';
import image2 from '../../../../../public/images/Contacts/Desktop/Contacts-image-2-desk.jpg';
import ContactsEmailForm from 'components/contactsEmailForm/ContactsEmailForm';

import HeroSection from 'components/heroSection/HeroSection';
import Header from 'components/header/Header';
import Footer from 'components/footer/Footer';
import { ContactsType } from 'types/dataTypeForFirebase';
import { Lang } from 'types/otherType';

interface IProps {
  params: { locale: string };
}

const Contacts = async ({ params: { locale } }: IProps) => {
  const intl = await getIntl(locale);
  // console.log('locale-CONTACTS', locale);

  const data = await getDataFromFirestore<ContactsType>('contacts');
  // console.log('contact page', data);

  return (
    <>
      {/* <Header color="#806000" />
      <div className={styles.wrapper}> */}
      {locale === Lang.UK && (
        <HeroSection
          backgroundImage={data?.backgroundImageDesktop}
          title={data?.titleUK}
          subtitle={data?.subtitleUK}
          initialAnimation={-1520}
        />
      )}
      {locale === Lang.EN && (
        <HeroSection
          backgroundImage={data?.backgroundImageDesktop}
          title={data?.titleEN}
          subtitle={data?.subtitleEN}
          initialAnimation={-1440}
        />
      )}
      {locale === Lang.TR && (
        <HeroSection
          backgroundImage={data?.backgroundImageDesktop}
          title={data?.titleTR}
          subtitle={data?.subtitleTR}
          initialAnimation={-1000}
        />
      )}

      <section className={styles.container}>
        {data && (
          <>
            <div className={styles.textContainer}>
              {data?.textUK && locale === Lang.UK && (
                <Content content={data.textUK} />
              )}
              {data?.textEN && locale === Lang.EN && (
                <Content content={data.textEN} />
              )}
              {data?.textTR && locale === Lang.TR && (
                <Content content={data.textTR} />
              )}
            </div>
            <div className={styles.tilesLayout}>
              <div className={styles.infoBlock}>
                <h3 className={styles.infoTitle}>
                  {intl.formatMessage({ id: 'page.contacts.infoTitle' })}
                </h3>
                <ul className={styles.list}>
                  <li className={styles.itemAddress}>
                    {data.addressUK && locale === Lang.UK && (
                      <>
                        <div className={styles.circleLoc}>
                          <div className={styles.location}></div>
                        </div>
                        <p>{data.addressUK}</p>
                      </>
                    )}
                    {data.addressEN && locale === Lang.EN && (
                      <>
                        <div className={styles.circleLoc}>
                          <div className={styles.location}></div>
                        </div>
                        <p>{data.addressEN}</p>
                      </>
                    )}
                    {data.addressTR && locale === Lang.TR && (
                      <>
                        <div className={styles.circleLoc}>
                          <div className={styles.location}></div>
                        </div>
                        <p>{data.addressTR}</p>
                      </>
                    )}
                  </li>

                  {data.email && (
                    <li className={styles.item}>
                      <a className={styles.link} href={`mailto:${data.email}`}>
                        <div className={styles.circle}>
                          <div className={styles.email}></div>
                        </div>
                        {data.email}
                      </a>
                    </li>
                  )}
                  {data.tel1 && (
                    <li className={styles.item}>
                      <a className={styles.link} href={`tel:${data.tel1}`}>
                        <div className={styles.circle}>
                          <div className={styles.phone}></div>
                        </div>
                        {data.tel1}
                      </a>
                    </li>
                  )}
                  {data.tel2 && (
                    <li className={styles.item}>
                      <a className={styles.link} href={`tel:${data.tel2}`}>
                        <div className={styles.circle}>
                          <div className={styles.phone}></div>
                        </div>
                        {data.tel2}
                      </a>
                    </li>
                  )}
                  {data.telegram && (
                    <li className={styles.item}>
                      <a
                        className={styles.link}
                        href={`https://t.me/AleksArden`}
                        target="_blank"
                      >
                        <div className={styles.circle}>
                          <div className={styles.telegram}></div>
                        </div>
                        {data.telegram}
                      </a>
                    </li>
                  )}
                  {data.facebook && (
                    <li className={styles.item}>
                      <a
                        className={styles.link}
                        href={`https://www.facebook.com/${data.facebook}`}
                        target="_blank"
                      >
                        <div className={styles.circle}>
                          <div className={styles.facebook}></div>
                        </div>
                        {data.facebook}
                      </a>
                    </li>
                  )}
                  {data.instagram && (
                    <li className={styles.item}>
                      <a
                        className={styles.link}
                        href={`https://instagram.com/${data.instagram}`}
                        target="_blank"
                      >
                        <div className={styles.circle}>
                          <div className={styles.instagram}></div>
                        </div>
                        {data.instagram}
                      </a>
                    </li>
                  )}
                </ul>
              </div>
              <Image
                className={styles.imageBlockUp}
                src={image1}
                alt="Picture"
                loading="lazy"
              />
              <Image
                className={styles.imageBlockDown}
                src={image2}
                alt="Picture"
                loading="lazy"
              />
              <ContactsEmailForm locale={locale} />
            </div>
          </>
        )}
      </section>
      {/* <Footer color="#806000" /> */}
    </>
  );
};
export default Contacts;
