import Image from 'next/image';
import NavBar from '../navBar/NavBar';
import logo from 'public/logo/Alliance Group logo_png.png';
import { navItems } from 'helpers/navigation';

import styles from './Header.module.scss';
import Link from 'next/link';
const Header = () => {
  return (
    <header className={styles.container}>
      <div>
        <Link href="/">
          <Image src={logo} width="100" alt="logo company" priority={true} />
        </Link>
      </div>
      <NavBar navLinks={navItems} />
    </header>
  );
};
export default Header;
