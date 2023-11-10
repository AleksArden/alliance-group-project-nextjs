import {
  AboutUsType,
  ContactsType,
  HomePageType,
  HomeProductsType,
  HomeServicesType,
  IntroType,
  ProductType,
  ServiceType,
  StaffType,
} from 'types/dataTypeForFirebase';
import {
  ActionContacts,
  ActionsAboutUs,
  ActionAddStaff,
  ActionsHomePage,
  ActionsIntro,
  ActionsProducts,
  ActionsHomeProducts,
  ActionsHomeServices,
  ActionsServices,
} from 'types/reducerTypes';

export const initStateContactsForm = {
  title: '',
  subtitle: '',
  text: '',
  address: '',
  email: '',
  tel1: '',
  tel2: '',
  telegram: '',
  facebook: '',
  instagram: '',
  backgroundImageDesktop: '',
  backgroundImageTablet: '',
  backgroundImageMobile: '',
};
export const reducerContactsForm = (
  state: ContactsType,
  { type, payload }: ActionContacts
) => {
  return (state = { ...state, [type]: payload });
};
export const initStateHomePageForm = {
  title: '',
  subtitle: '',
  backgroundImageDesktop: '',
  backgroundImageTablet: '',
  backgroundImageMobile: '',
};

export const reducerHomePageForm = (
  state: HomePageType,
  { type, payload }: ActionsHomePage
) => {
  return (state = { ...state, [type]: payload });
};
export const initStateAboutUsForm = {
  title: '',
  subtitle: '',
  textOurHistory: '',
  textOurMission: '',
  textOurTeam: '',
  backgroundImageDesktop: '',
  backgroundImageTablet: '',
  backgroundImageMobile: '',
};
export const reducerAboutUsForm = (
  state: AboutUsType,
  { type, payload }: ActionsAboutUs
) => {
  return (state = { ...state, [type]: payload });
};
export const initStateAddStaff = {
  order: '',
  photoStaff: '',
  nameUA: '',
  nameEN: '',
  nameTR: '',
  positionUA: '',
  positionEN: '',
  positionTR: '',
  descriptionUA: '',
  descriptionEN: '',
  descriptionTR: '',
};
export const reducerAddStaff = (
  state: StaffType,
  { type, payload }: ActionAddStaff
) => {
  return (state = { ...state, [type]: payload });
};
export const initStateIntroForm = {
  text: '',
  sign: '',
  backgroundImageDesktop: '',
  backgroundImageTablet: '',
  backgroundImageMobile: '',
};
export const reducerIntroForm = (
  state: IntroType,
  { type, payload }: ActionsIntro
) => {
  return (state = { ...state, [type]: payload });
};
export const initStateProducts = {
  imageProduct: '',
  nameUA: '',
  nameEN: '',
  nameTR: '',
  sizeUA: '',
  sizeEN: '',
  sizeTR: '',
  descriptionUA: '',
  descriptionEN: '',
  descriptionTR: '',
};
export const reducerProducts = (
  state: ProductType,
  { type, payload }: ActionsProducts
) => {
  return (state = { ...state, [type]: payload });
};
export const initStateHomeProductsForm = {
  titleUA: '',
  titleEN: '',
  titleTR: '',
  backgroundImageDesktop: '',
  backgroundImageTablet: '',
  backgroundImageMobile: '',
};
export const reducerHomeProductsForm = (
  state: HomeProductsType,
  { type, payload }: ActionsHomeProducts
) => {
  return (state = { ...state, [type]: payload });
};
export const initStateHomeServicesForm = {
  titleUA: '',
  titleEN: '',
  titleTR: '',
  backgroundImageDesktop: '',
  backgroundImageTablet: '',
  backgroundImageMobile: '',
};
export const reducerHomeServicesForm = (
  state: HomeServicesType,
  { type, payload }: ActionsHomeServices
) => {
  return (state = { ...state, [type]: payload });
};
export const initStateServices = {
  serviceId: '',
  imageService: '',
  imageName: '',
  nameUA: '',
  nameEN: '',
  nameTR: '',
  descriptionUA: '',
  descriptionEN: '',
  descriptionTR: '',
};
export const reducerServices = (
  state: ServiceType,
  { type, payload }: ActionsServices
) => {
  return (state = { ...state, [type]: payload });
};
