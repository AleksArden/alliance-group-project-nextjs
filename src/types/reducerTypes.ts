import { GalleryImageURLType } from './dataTypeForFirebase';
// ============================================================================
export type ActionsContacts = {
  type:
    | 'titleUK'
    | 'titleEN'
    | 'titleTR'
    | 'subtitleUK'
    | 'subtitleEN'
    | 'subtitleTR'
    | 'textUK'
    | 'textEN'
    | 'textTR'
    | 'addressUK'
    | 'addressEN'
    | 'addressTR'
    | 'email'
    | 'tel1'
    | 'tel2'
    | 'telegram'
    | 'facebook'
    | 'instagram'
    | 'backgroundImageDesktop'
    | 'backgroundImageTablet'
    | 'backgroundImageMobile';
  payload: string;
};
// =======================================================================
export type ActionsHomePage = {
  type:
    | 'titleUK'
    | 'titleEN'
    | 'titleTR'
    | 'subtitleUK'
    | 'subtitleEN'
    | 'subtitleTR'
    | 'firstBackgroundImageDesktop'
    | 'secondBackgroundImageDesktop'
    | 'thirdBackgroundImageDesktop'
    | 'firstBackgroundImageTablet'
    | 'secondBackgroundImageTablet'
    | 'thirdBackgroundImageTablet'
    | 'firstBackgroundImageMobile'
    | 'secondBackgroundImageMobile'
    | 'thirdBackgroundImageMobile';
  payload: string;
};
// =====================================================================
export type ActionsAboutCompany = {
  type:
    | 'titleUK'
    | 'subtitleUK'
    | 'textOurHistoryUK'
    | 'textOurMissionUK'
    | 'textOurTeamUK'
    | 'titleEN'
    | 'subtitleEN'
    | 'textOurHistoryEN'
    | 'textOurMissionEN'
    | 'textOurTeamEN'
    | 'titleTR'
    | 'subtitleTR'
    | 'textOurHistoryTR'
    | 'textOurMissionTR'
    | 'textOurTeamTR'
    | 'backgroundImageDesktop'
    | 'backgroundImageTablet'
    | 'backgroundImageMobile';
  payload: string;
};
// ====================================================================
export type ActionsGallery = {
  type:
    | 'titleUK'
    | 'subtitleUK'
    | 'titleEN'
    | 'subtitleEN'
    | 'titleTR'
    | 'subtitleTR'
    | 'backgroundImageDesktop'
    | 'backgroundImageTablet'
    | 'backgroundImageMobile';
  payload: string;
};
// =======================================================================
export type ActionsProductsServices = {
  type:
    | 'titleUK'
    | 'subtitleUK'
    | 'textUK'
    | 'titleEN'
    | 'subtitleEN'
    | 'textEN'
    | 'titleTR'
    | 'subtitleTR'
    | 'textTR'
    | 'backgroundImageDesktop'
    | 'backgroundImageTablet'
    | 'backgroundImageMobile';
  payload: string;
};
// ====================================================================
export type ActionsIntro = {
  type:
    | 'text'
    | 'sign'
    | 'backgroundImageDesktop'
    | 'backgroundImageTablet'
    | 'backgroundImageMobile';
  payload: string;
};
// ==================================================================
export type ActionsHomeProducts = {
  type:
    | 'titleUK'
    | 'titleEN'
    | 'titleTR'
    | 'backgroundImageDesktop'
    | 'backgroundImageTablet'
    | 'backgroundImageMobile';
  payload: string;
};
// ====================================================================
export type ActionsHomeServices = {
  type:
    | 'titleUK'
    | 'titleEN'
    | 'titleTR'
    | 'backgroundImageDesktop'
    | 'backgroundImageTablet'
    | 'backgroundImageMobile';
  payload: string;
};
// =================================================
export type ActionsProductService =
  | {
      type:
        | 'id'
        | 'imageURL'
        | 'productName'
        | 'nameUK'
        | 'nameEN'
        | 'nameTR'
        | 'sizeUK'
        | 'sizeEN'
        | 'sizeTR'
        | 'descriptionUK'
        | 'descriptionEN'
        | 'descriptionTR';

      payload: string;
    }
  | {
      type: 'galleryImagesURL';
      payload: GalleryImageURLType;
    };
// ======================================================================
export type ActionsStaff = {
  type:
    | 'id'
    | 'imageURL'
    | 'staffName'
    | 'nameUA'
    | 'nameEN'
    | 'nameTR'
    | 'positionUA'
    | 'positionEN'
    | 'positionTR'
    | 'descriptionUA'
    | 'descriptionEN'
    | 'descriptionTR';
  payload: string;
};
// =======================================================================
export type ActionsGalleryProductsServicesFile = {
  type:
    | 'backgroundImageDesktop'
    | 'backgroundImageTablet'
    | 'backgroundImageMobile'
    | 'imageURL1'
    | 'imageURL2'
    | 'imageURL3'
    | 'imageURL4'
    | 'imageURL5'
    | 'imageURL6';
  payload: FileList | null;
};
// =================================================================
