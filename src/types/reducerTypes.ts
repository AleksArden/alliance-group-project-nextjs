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
    | 'title'
    | 'subtitle'
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
export type ActionsAddStaff = {
  type:
    | 'photoStaff'
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
