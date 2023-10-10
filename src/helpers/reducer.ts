import {
  AboutUsType,
  ContactsType,
  HomePageType,
  IntroType,
  StaffType,
} from 'types/dataTypeForFirebase';
import {
  ActionContacts,
  ActionsAboutUs,
  ActionAddStaff,
  ActionsHomePage,
  ActionsIntro,
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
