'use client';

import Link from 'next/link';
import { navigation } from 'helpers/navigation';

const NavBar = () => {
  return (
    <div>
      {navigation.map(({ id, title, path }) => (
        <Link key={id} href={path}>
          {title}
        </Link>
      ))}
    </div>
  );
};
export default NavBar;
