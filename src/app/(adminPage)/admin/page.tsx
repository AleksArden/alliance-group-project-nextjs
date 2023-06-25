'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Admin = () => {
  const router = useRouter();
  useEffect(() => {
    router.push('/admin/login');
  }, [router]);
  return <></>;
};
export default Admin;
