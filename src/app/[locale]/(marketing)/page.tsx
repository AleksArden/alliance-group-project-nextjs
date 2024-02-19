import { Metadata } from 'next';

type RouteProps = {
  params: { locale: string };
  searchParams: { [key: string]: string | string[] | undefined };
};
export async function generateMetadata(props: RouteProps): Promise<Metadata> {
  const intl = await getIntl(props.params.locale);
  return {
    title: intl.formatMessage({ id: 'page.home.head.title' }),
    description: 'Generated by create next app',
  };
}
import { getAllCards, getDataFromFirestore } from '@/firebase/getData';

import {
  HomePageType,
  HomeProductsType,
  HomeServicesType,
  IntroType,
  ProductServiceType,
} from 'types/dataTypeForFirebase';
import ClientHomePage from '../../../components/clientHomePage/ClientHomePage';
import { getIntl } from 'lib/intl';
type IProps = {
  params: { locale: string };
};
const Home = async ({ params: { locale } }: IProps) => {
  const dataHero = await getDataFromFirestore<HomePageType>('home');
  // console.log('page home-page', dataHero);
  const dataIntro = await getDataFromFirestore<IntroType>('intro');
  // console.log('intro home', dataIntro);
  const dataHomeProducts = await getDataFromFirestore<HomeProductsType>(
    'homeProducts'
  );
  // console.log('homeProducts home', dataHomeProducts);
  const listAllProducts = await getAllCards<ProductServiceType>('products');
  // console.log('list productsHome', listAllProducts);
  const dataHomeServices = await getDataFromFirestore<HomeServicesType>(
    'homeServices'
  );
  // console.log('homeServices home', dataHomeServices);
  const listAllServices = await getAllCards<ProductServiceType>('services');
  // console.log('list servicesHome', listAllServices);
  const props = {
    dataHero,
    dataIntro,
    dataHomeProducts,
    listAllProducts,
    dataHomeServices,
    listAllServices,
    locale,
  };
  return <ClientHomePage props={props} />;
};
export default Home;
