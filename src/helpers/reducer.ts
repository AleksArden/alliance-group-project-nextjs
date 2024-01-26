import {
  AboutCompanyType,
  ContactsType,
  GalleryType,
  HomePageType,
  HomeProductsType,
  HomeServicesType,
  IntroType,
  ProductServiceType,
  ProductsServicesType,
  StaffType,
} from 'types/dataTypeForFirebase';

import {
  ActionsContacts,
  ActionsAboutCompany,
  ActionsHomePage,
  ActionsIntro,
  ActionsHomeProducts,
  ActionsHomeServices,
  ActionsStaff,
  ActionsGallery,
  ActionsProductsServices,
  ActionsProductService,
} from 'types/reducerTypes';

export const initStateContactsForm = {
  titleUK: '',
  titleEN: '',
  titleTR: '',
  subtitleUK: '',
  subtitleEN: '',
  subtitleTR: '',
  textUK: '',
  textEN: '',
  textTR: '',
  addressUK: '',
  addressEN: '',
  addressTR: '',
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
  { type, payload }: ActionsContacts
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
export const initStateAboutCompanyForm = {
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
export const reducerAboutCompanyForm = (
  state: AboutCompanyType,
  { type, payload }: ActionsAboutCompany
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
// ================================================================
export const initStateProductService = {
  id: 0,
  imageURL: '',
  productName: '',
  nameUK: '',
  nameEN: '',
  nameTR: '',
  sizeUK: '',
  sizeEN: '',
  sizeTR: '',
  descriptionUK: '',
  descriptionEN: '',
  descriptionTR: '',
  galleryImagesURL: [],
};
export const reducerProductService = (
  state: ProductServiceType,
  { type, payload }: ActionsProductService
) => {
  switch (type) {
    case 'galleryImagesURL':
      return (state = {
        ...state,
        galleryImagesURL: [...state.galleryImagesURL, payload],
      });

    default:
      return (state = { ...state, [type]: payload });
  }
};
// =========================================================================

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

export const initStateGalleryProductsServicesFile = {
  backgroundImageDesktop: null,
  backgroundImageTablet: null,
  backgroundImageMobile: null,
  imageURL1: null,
  imageURL2: null,
  imageURL3: null,
  imageURL4: null,
  imageURL5: null,
  imageURL6: null,
};
