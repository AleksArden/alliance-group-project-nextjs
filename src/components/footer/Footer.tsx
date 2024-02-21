import styles from 'components/footer/footer.module.scss';
import Copyright from './copyright/Copyright';
import FooterNavigation from './footerNavigation/FooterNavigation';
import { getDataFromFirestore } from '@/firebase/getData';
import { ContactsType } from 'types/dataTypeForFirebase';

const Footer = async ({ locale }: { locale: string }) => {
  const data = await getDataFromFirestore<ContactsType>('contactsPage');
  return (
    <footer>
      <div className={styles.footer}>
        <FooterNavigation locale={locale} contacts={data} />
      </div>
      <div className={styles.copyright}>
        <Copyright />
      </div>
    </footer>
  );
};
export default Footer;
