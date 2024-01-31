import { getDataFromFirestore } from '@/firebase/getData';
import HeaderMain from './HeaderMain/HeaderMain';
import { ContactsType } from 'types/dataTypeForFirebase';

const Header = async ({ locale }: { locale: string }) => {
  const data = await getDataFromFirestore<ContactsType>('contacts');
  return <HeaderMain locale={locale} contacts={data} />;
};
export default Header;
