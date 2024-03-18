'use client';

import styles from './Contacts.module.scss';
import ContactsForm from './contactsForm/ContactsForm';
import AdminButton from 'components/adminButton/AdminButton';
import AdminSubmitButton from 'components/adminSubmitButton/AdminSubmitButton';
import { useState } from 'react';
import { ContactsType } from 'types/dataTypeForFirebase';

const AdminContacts = ({ data }: { data: ContactsType }) => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <>
      <header className={styles.adminHeader}>
        <h2 className={styles.title}>Contacts Page</h2>

        <AdminSubmitButton
          btnName="Зберегти"
          idForm="contacts"
          isLoading={isLoading}
        />

        <div className={styles.buttonWrapper}>
          <AdminButton title="Перейти на сайт" onClickGoToSite={true} />
          <AdminButton title="Вийти" onClickLogout={true} />
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
