import {
  AboutUsType,
  AddStaffType,
  ContactsType,
  HomePageType,
} from 'types/dataTypeForFirebase';
import {
  ActionContacts,
  ActionsAboutUs,
  ActionsAddStaff,
  ActionsHomePage,
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
  photoStaff: '',
  name: '',
  position: '',
  description: '',
};
export const reducerAddStaff = (
  state: AddStaffType,
  { type, payload }: ActionsAddStaff
) => {
  return (state = { ...state, [type]: payload });
};
