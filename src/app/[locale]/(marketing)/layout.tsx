import 'app/globals.scss';
import { raleway } from '../../../styles/fonts';
import Header from 'components/header/Header';
import Footer from 'components/footer/Footer';
import styles from './layout.module.scss';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Alliance Group LLC',
  description: 'Generated by create next app',
};

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'uk' }, { locale: 'tr' }];
}

interface LayoutProps {
  params: { locale: string };
  children: React.ReactNode;
}

const RootLayout = ({ children, params }: LayoutProps) => {
  const { locale } = params;
  return (
    <html className={raleway.className} lang={locale}>
      <link
        rel="icon"
        href="../../../../public/icons/favicon-32x32.png"
        type="png"
        sizes="32px"
      />
      <body className={styles.body}>
        <Header locale={locale} />
        <main className={styles.container}>{children}</main>
        <Footer locale={locale} />
      </body>
    </html>
  );
};
export default RootLayout;
