'use client';

import styles from './Contacts.module.scss';
import ContactsForm from './contactsForm/ContactsForm';
import AdminButton from 'components/adminButton/AdminButton';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ContactsType } from 'types/dataTypeForFirebase';

const AdminContacts = ({ data }: { data: ContactsType }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  return (
    <>
      <header className={styles.adminHeader}>
        <h2 className={styles.title}>Contacts Page</h2>

        <AdminButton
          btnName={isLoading ? 'Завантажується' : 'Зберегти'}
          idForm="contactsForm"
          disabled={isLoading ? true : false}
          type="submit"
        />

        <div className={styles.buttonWrapper}>
          <AdminButton
            btnName="Перейти на сайт"
            onClick={() => {
              router.push('/contacts');
            }}
          />
          <AdminButton btnName="Вийти" btnLogout={true} />
        </div>
      </header>
      <section className={styles.section}>
        <div className={styles.container}>
          <ContactsForm
            data={data}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        </div>
      </section>
    </>
  );
};
export default AdminContacts;
