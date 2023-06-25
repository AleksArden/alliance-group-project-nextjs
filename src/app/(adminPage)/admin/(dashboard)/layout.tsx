'use client';

import { useAuthContex } from 'context/AuthContex';
import { useRouter } from 'next/navigation';
import SideBar from 'components/sideBar/SideBar';
import { useEffect } from 'react';

import styles from './layout.module.scss';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const user = useAuthContex();
  const router = useRouter();

  useEffect(() => {
    if (user === null) router.push('/admin/login');
  }, [user, router]);

  if (user === null) return;
  return (
    <div className={styles.container}>
      <SideBar />

      <div>{children}</div>
    </div>
  );
};
export default DashboardLayout;
