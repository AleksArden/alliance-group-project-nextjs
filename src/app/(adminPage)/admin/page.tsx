import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin | Alliance Group',
  description: 'Generated by create next app',
};

import LoginForm from 'components/LoginForm/LoginForm';
import styles from './page.module.scss';

const Admin = () => {
  return (
    <div className={styles.container}>
      <h2>Login to the admin page of Alliance Group LLC</h2>
      <LoginForm />
    </div>
  );
};
export default Admin;
