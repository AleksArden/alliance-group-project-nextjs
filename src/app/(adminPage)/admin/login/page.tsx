import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin/login | Alliance Group',
};

import LoginForm from 'components/LoginForm/LoginForm';
import styles from './page.module.scss';

const Login = () => {
  return (
    <div className={styles.container}>
      <LoginForm />
    </div>
  );
};
export default Login;
