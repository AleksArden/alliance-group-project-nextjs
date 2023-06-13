import './globals.css';
import { Inter } from 'next/font/google';
import Header from 'components/Header';
import Footer from 'components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main>{children}</main>

        <Footer />
      </body>
    </html>
  );
};
export default RootLayout;
