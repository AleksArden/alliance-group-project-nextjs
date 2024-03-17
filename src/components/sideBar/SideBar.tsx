import { sideBarItems } from 'helpers/navigation';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './SideBar.module.scss';

const SideBar = () => {
  const pathname = usePathname();

  return (
    <aside className={styles.container}>
      <ul>
        {sideBarItems.map(({ id, href, label }) => {
          const isActive = pathname === href;
          return (
            <li key={id} className={styles.item}>
              <Link
                className={isActive ? styles.active : styles.link}
                href={href}
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};
export default SideBar;
