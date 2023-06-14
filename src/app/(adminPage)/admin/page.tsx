import styles from './page.module.scss';

const Admin = () => {
  return (
    <div className={styles.container}>
      <h2>Login to the admin page of Alliance Group LLC</h2>
      <form className={styles.form}>
        <label>
          <input className={styles.input} />
        </label>
        <label>
          <input className={styles.input} />
        </label>
        <button className={styles.button} type="button">
          Login
        </button>
      </form>
    </div>
  );
};
export default Admin;
