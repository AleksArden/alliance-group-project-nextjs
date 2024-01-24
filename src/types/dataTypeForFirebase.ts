import { Lang } from './otherType';

export type HomePageType = {
  titleUK: string;
  titleEN: string;
  titleTR: string;
  subtitleUK: string;
  subtitleEN: string;
  subtitleTR: string;
  backgroundImageDesktop: string;
  backgroundImageTablet: string;
  backgroundImageMobile: string;
};
export type ContactsType = {
  titleUK: string;
  titleEN: string;
  titleTR: string;
  subtitleUK: string;
  subtitleEN: string;
  subtitleTR: string;
  textUK: string;
  textEN: string;
  textTR: string;
  addressUK: string;
  addressEN: string;
  addressTR: string;
  email: string;
  tel1: string;
  tel2: string;
  telegram: string;
  facebook: string;
  instagram: string;
  backgroundImageDesktop: string;
  backgroundImageTablet: string;
  backgroundImageMobile: string;
};
export type AboutUsType = {
  titleUK: string;
  subtitleUK: string;
  textOurHistoryUK: string;
  textOurMissionUK: string;
  textOurTeamUK: string;
  titleEN: string;
  subtitleEN: string;
  textOurHistoryEN: string;
  textOurMissionEN: string;
  textOurTeamEN: string;
  titleTR: string;
  subtitleTR: string;
  textOurHistoryTR: string;
  textOurMissionTR: string;
  textOurTeamTR: string;
  backgroundImageDesktop: string;
  backgroundImageTablet: string;
  backgroundImageMobile: string;
};

export type GalleryType = {
  titleUK: string;
  subtitleUK: string;
  titleEN: string;
  subtitleEN: string;
  titleTR: string;
  subtitleTR: string;
  backgroundImageDesktop: string;
  backgroundImageTablet: string;
  backgroundImageMobile: string;
};

export type ProductsServicesType = {
  titleUK: string;
  subtitleUK: string;
  titleEN: string;
  subtitleEN: string;
  titleTR: string;
  subtitleTR: string;
  textUK: string;
  textEN: string;
  textTR: string;
  backgroundImageDesktop: string;
  backgroundImageTablet: string;
  backgroundImageMobile: string;
};

export type IntroType = {
  text: string;
  sign: string;
  backgroundImageDesktop: string;
  backgroundImageTablet: string;
  backgroundImageMobile: string;
};

export type HomeProductsType = {
  titleUK: string;
  titleEN: string;
  titleTR: string;
  backgroundImageDesktop: string;
  backgroundImageTablet: string;
  backgroundImageMobile: string;
};
export type HomeServicesType = {
  titleUK: string;
  titleEN: string;
  titleTR: string;
  backgroundImageDesktop: string;
  backgroundImageTablet: string;
  backgroundImageMobile: string;
};
// =========================================================
export type GalleryImageURLType = {
  imageName: string;
  imageURL: string;
};
// ____________________
export type ProductServiceType = {
  id: number;
  imageURL: string;
  productName: string;
  nameUK: string;
  nameEN: string;
  nameTR: string;
  sizeUK: string;
  sizeEN: string;
  sizeTR: string;
  descriptionUK: string;
  descriptionEN: string;
  descriptionTR: string;
  galleryImagesURL: GalleryImageURLType[];
};
// =================================================================

export type StaffType = {
  id: number;
  imageURL: string;
  imageName: string;
  nameUA: string;
  nameEN: string;
  nameTR: string;
  positionUA: string;
  positionEN: string;
  positionTR: string;
  descriptionUA: string;
  descriptionEN: string;
  descriptionTR: string;
};
