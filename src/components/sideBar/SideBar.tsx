import { logout } from '@/firebase/logout';
import { sideBarItems } from 'helpers/navigation';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const SideBar = () => {
  const router = useRouter();
  const handleClick = () => {
    logout();
    router.push('/');
  };
  return (
    <aside>
      <h3>Side Bar</h3>
      <ul>
        {sideBarItems.map(({ id, href, label }) => (
          <li key={id}>
            <Link href={href}>{label}</Link>
          </li>
        ))}
      </ul>
      <button type="button" onClick={handleClick}>
        logout
      </button>
    </aside>
  );
};
export default SideBar;
