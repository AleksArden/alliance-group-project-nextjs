'use client';

import styles from './LoginForm.module.scss';

const LoginForm = () => {
  return (
    <form className={styles.form}>
      <label>
        <input className={styles.input} />
      </label>
      <label>
        <input className={styles.input} />
      </label>
      <button className={styles.button} type="submit">
        Login
      </button>
    </form>
  );
};
export default LoginForm;
