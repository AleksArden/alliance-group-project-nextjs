'use client';

import { useEffect, useState } from 'react';

import styles from './LoginForm.module.scss';
import { useRouter } from 'next/navigation';
import { login } from '@/firebase/login';
import { useAuthContex } from 'context/AuthContex';

const LoginForm = () => {
  const user = useAuthContex();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (user) router.push('/admin/main');
  }, [router, user]);

  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const { error } = await login(email, password);
    if (error) {
      return console.log(error);
    }

    router.push('/admin/main');
  };
  if (user) return;

  return (
    <>
      <h2>Login to the admin page of Alliance Group LLC</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label>
          <input
            className={styles.input}
            name="email"
            type="email"
            required
            placeholder="Email"
            onChange={evt => setEmail(evt.target.value)}
            value={email}
          />
        </label>
        <label>
          <input
            className={styles.input}
            name="password"
            type="password"
            required
            placeholder="Password"
            onChange={evt => setPassword(evt.target.value)}
            value={password}
          />
        </label>
        <button className={styles.button} type="submit">
          Login
        </button>
      </form>
    </>
  );
};
export default LoginForm;
