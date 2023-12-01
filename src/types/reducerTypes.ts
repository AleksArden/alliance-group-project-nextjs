export type ActionContacts = {
  type:
    | 'title'
    | 'subtitle'
    | 'text'
    | 'email'
    | 'address'
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
export type ActionsHomePage = {
  type:
    | 'titleUK'
    | 'titleEN'
    | 'titleTR'
    | 'subtitleUK'
    | 'subtitleEN'
    | 'subtitleTR'
    | 'backgroundImageDesktop'
    | 'backgroundImageTablet'
    | 'backgroundImageMobile';
  payload: string;
};
export type ActionsAboutUs = {
  type:
    | 'title'
    | 'subtitle'
    | 'textOurHistory'
    | 'textOurMission'
    | 'textOurTeam'
    | 'backgroundImageDesktop'
    | 'backgroundImageTablet'
    | 'backgroundImageMobile';
  payload: string;
};

export type ActionsIntro = {
  type:
    | 'text'
    | 'sign'
    | 'backgroundImageDesktop'
    | 'backgroundImageTablet'
    | 'backgroundImageMobile';
  payload: string;
};

export type ActionsHomeProducts = {
  type:
    | 'titleUA'
    | 'titleEN'
    | 'titleTR'
    | 'backgroundImageDesktop'
    | 'backgroundImageTablet'
    | 'backgroundImageMobile';
  payload: string;
};
export type ActionsHomeServices = {
  type:
    | 'titleUA'
    | 'titleEN'
    | 'titleTR'
    | 'backgroundImageDesktop'
    | 'backgroundImageTablet'
    | 'backgroundImageMobile';
  payload: string;
};

export type ActionsProducts = {
  type:
    | 'id'
    | 'imageURL'
    | 'imageName'
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
};
export type ActionsServices = {
  type:
    | 'id'
    | 'imageURL'
    | 'imageName'
    | 'nameUA'
    | 'nameEN'
    | 'nameTR'
    | 'descriptionUA'
    | 'descriptionEN'
    | 'descriptionTR';
  payload: string;
};
export type ActionsStaff = {
  type:
    | 'id'
    | 'imageURL'
    | 'imageName'
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
