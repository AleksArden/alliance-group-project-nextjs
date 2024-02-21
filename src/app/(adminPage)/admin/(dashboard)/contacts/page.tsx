import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Admin/Contacts | Alliance Group LLC™',
};
import styles from './Contacts.module.scss';
import ContactsForm from './contactsForm/ContactsForm';
import { getDataFromFirestore } from '@/firebase/getData';
import { ContactsType } from 'types/dataTypeForFirebase';

const AdminContacts = async () => {
  const data = await getDataFromFirestore<ContactsType>('contactsPage');
  // console.log('contacts admin', data);
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Admin/Contacts</h2>
      <ContactsForm data={data} />
    </div>
  );
};
export default AdminContacts;
