import Image from 'next/image';
import NavBar from '../navBar/NavBar';
import logo from 'public/logo/Alliance Group logo_png.png';

import styles from './Header.module.scss';
const Header = () => {
  return (
    <header className={styles.container}>
      <div>
        <Image src={logo} width="100" alt="logo company" priority={true} />
      </div>
      <NavBar />
    </header>
  );
};
export default Header;
