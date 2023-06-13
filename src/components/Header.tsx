import Image from 'next/image';
import NavBar from './NavBar';
import logo from 'public/logo/Alliance Group logo_png.png';
const Header = () => {
  return (
    <header>
      <div>
        <Image src={logo} width="100" height="100" alt="logo company" />
      </div>
      <NavBar />
    </header>
  );
};
export default Header;
