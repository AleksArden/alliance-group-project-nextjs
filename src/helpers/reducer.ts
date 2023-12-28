import {
  AboutUsType,
  ContactsType,
  GalleryType,
  HomePageType,
  HomeProductsType,
  HomeServicesType,
  IntroType,
  ProductType,
  ProductsServicesType,
  ServiceType,
  StaffType,
} from 'types/dataTypeForFirebase';
import {
  ActionContacts,
  ActionsAboutUs,
  ActionsHomePage,
  ActionsIntro,
  ActionsProducts,
  ActionsHomeProducts,
  ActionsHomeServices,
  ActionsServices,
  ActionsStaff,
  ActionsGallery,
  ActionsProductsServices,
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
  titleUK: '',
  titleEN: '',
  titleTR: '',
  subtitleUK: '',
  subtitleEN: '',
  subtitleTR: '',
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
  titleUK: '',
  subtitleUK: '',
  textOurHistoryUK: '',
  textOurMissionUK: '',
  textOurTeamUK: '',
  titleEN: '',
  subtitleEN: '',
  textOurHistoryEN: '',
  textOurMissionEN: '',
  textOurTeamEN: '',
  titleTR: '',
  subtitleTR: '',
  textOurHistoryTR: '',
  textOurMissionTR: '',
  textOurTeamTR: '',
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

export const initStateGalleryForm = {
  titleUK: '',
  subtitleUK: '',
  titleEN: '',
  subtitleEN: '',
  titleTR: '',
  subtitleTR: '',
  backgroundImageDesktop: '',
  backgroundImageTablet: '',
  backgroundImageMobile: '',
};
export const reducerGalleryForm = (
  state: GalleryType,
  { type, payload }: ActionsGallery
) => {
  return (state = { ...state, [type]: payload });
};

export const initStateProductsServicesForm = {
  titleUK: '',
  subtitleUK: '',
  textUK: '',
  titleEN: '',
  subtitleEN: '',
  textEN: '',
  titleTR: '',
  subtitleTR: '',
  textTR: '',
  backgroundImageDesktop: '',
  backgroundImageTablet: '',
  backgroundImageMobile: '',
};
export const reducerProductsServicesForm = (
  state: ProductsServicesType,
  { type, payload }: ActionsProductsServices
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

export const initStateHomeProductsForm = {
  titleUK: '',
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
  titleUK: '',
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

export const initStateProducts = {
  id: 0,
  imageURL: '',
  imageName: '',
  nameUK: '',
  nameEN: '',
  nameTR: '',
  sizeUK: '',
  sizeEN: '',
  sizeTR: '',
  descriptionUK: '',
  descriptionEN: '',
  descriptionTR: '',
};
export const reducerProducts = (
  state: ProductType,
  { type, payload }: ActionsProducts
) => {
  return (state = { ...state, [type]: payload });
};

export const initStateServices = {
  id: 0,
  imageURL: '',
  imageName: '',
  nameUK: '',
  nameEN: '',
  nameTR: '',
  descriptionUK: '',
  descriptionEN: '',
  descriptionTR: '',
};
export const reducerServices = (
  state: ServiceType,
  { type, payload }: ActionsServices
) => {
  return (state = { ...state, [type]: payload });
};
export const initStateStaff = {
  id: 0,
  imageURL: '',
  imageName: '',
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
export const reducerStaff = (
  state: StaffType,
  { type, payload }: ActionsStaff
) => {
  return (state = { ...state, [type]: payload });
};
