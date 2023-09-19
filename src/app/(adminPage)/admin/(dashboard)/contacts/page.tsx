import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Admin/Contacts | Alliance Group',
};
import styles from './Contacts.module.scss';
import ContactsForm from './contactsForm/ContactsForm';
import { getDataContactsFromFirestore } from '@/firebase/getData';

export const revalidate = 3600;

const AdminContacts = async () => {
  const data = await getDataContactsFromFirestore();
  // console.log('contacts admin', data);
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Admin/Contacts</h2>;
      <ContactsForm data={data} />
    </div>
  );
};
export default AdminContacts;
