import { logout } from '@/firebase/logout';
import { sideBarItems } from 'helpers/navigation';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './SideBar.module.scss';

const SideBar = () => {
  const router = useRouter();
  const handleClick = () => {
    logout();
    router.push('/');
  };
  return (
    <aside className={styles.container}>
      <h3 className={styles.title}>Side Bar</h3>
      <ul>
        {sideBarItems.map(({ id, href, label }) => (
          <li key={id} className={styles.item}>
            <Link href={href}>{label}</Link>
          </li>
        ))}
      </ul>
      <button className={styles.button} type="button" onClick={handleClick}>
        logout
      </button>
    </aside>
  );
};
export default SideBar;
