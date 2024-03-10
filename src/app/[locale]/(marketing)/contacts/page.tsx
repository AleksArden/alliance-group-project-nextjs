import { getDataFromFirestore } from '@/firebase/getData';
import { Metadata, ResolvingMetadata } from 'next';
import { getIntl } from 'lib/intl';
type RouteProps = {
  params: { locale: string };
  searchParams: { [key: string]: string | string[] | undefined };
};
export async function generateMetadata(props: RouteProps): Promise<Metadata> {
  const intl = await getIntl(props.params.locale);
  return {
    title: intl.formatMessage({ id: 'page.contacts.head.title' }),
    description: 'Generated by create next app',
  };
}

import styles from './Contacts.module.scss';

import Content from 'components/content/Content';
import Image from 'next/image';
import image1 from '../../../../../public/images/Contacts/Desktop/Contacts-image-1-desk.jpg';
import image2 from '../../../../../public/images/Contacts/Desktop/Contacts-image-2-desk.jpg';
import ContactsEmailForm from 'components/contactsEmailForm/ContactsEmailForm';

import HeroSection from 'components/heroSection/HeroSection';

import { ContactsType } from 'types/dataTypeForFirebase';
import { Lang } from 'types/otherType';

interface IProps {
  params: { locale: string };
}

const Contacts = async ({ params: { locale } }: IProps) => {
  const intl = await getIntl(locale);

  const data = await getDataFromFirestore<ContactsType>('contactsPage');
  // console.log('contact page', data);

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
                <div className={styles.imageWrapperUp}>
                  <Image
                    className={styles.imageBlockUp}
                    src={image1}
                    fill
                    sizes="(max-width: 1079px) 100vw, 50vw"
                    alt="Picture"
                    loading="lazy"
                  />
                </div>
                <div className={styles.infoBlock}>
                  <h3 className={styles.infoTitle}>
                    {intl.formatMessage({ id: 'page.contacts.infoTitle' })}
                  </h3>
                  <ul className={styles.list}>
                    <li className={styles.itemAddress}>
                      <div className={styles.circleLoc}>
                        <div className={styles.location}></div>
                      </div>
                      <p>
                        {(data.addressUK &&
                          locale === Lang.UK &&
                          data.addressUK) ||
                          (data.addressEN &&
                            locale === Lang.EN &&
                            data.addressEN) ||
                          (data.addressTR &&
                            locale === Lang.TR &&
                            data.addressTR)}
                      </p>
                    </li>

                    {data.email && (
                      <li className={styles.item}>
                        <a
                          className={styles.link}
                          href={`mailto:${data.email}`}
                        >
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
                          href={`https://t.me/${data?.telegram.slice(1)}`}
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

                <div className={styles.imageWrapperDown}>
                  <Image
                    className={styles.imageBlockDown}
                    fill
                    sizes="(max-width: 1079px) 100vw, 50vw"
                    src={image2}
                    alt="Picture"
                    loading="lazy"
                  />
                </div>
                <ContactsEmailForm locale={locale} />
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
};
export default Contacts;
