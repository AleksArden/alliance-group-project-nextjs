import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Admin/Contacts | Alliance Group LLC™',
};

import { getDataFromFirestore } from '@/firebase/getData';
import { ContactsType } from 'types/dataTypeForFirebase';
import AdminContacts from './Contacts';

const AdminContactsPage = async () => {
  const data = await getDataFromFirestore<ContactsType>('contactsPage');
  // console.log('contacts admin', data);
  return <> {data && <AdminContacts data={data} />}</>;
};
export default AdminContactsPage;
