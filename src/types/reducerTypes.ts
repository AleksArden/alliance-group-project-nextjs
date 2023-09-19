export type ActionAboutUsForm = {
  type: 'title' | 'content' | 'imageURL';
  payload: string;
};
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
