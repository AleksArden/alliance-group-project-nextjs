import {
  AboutUsType,
  ContactsType,
  HomePageType,
} from 'types/dataTypeForFirebase';
import {
  ActionAboutUsForm,
  ActionContacts,
  ActionsHomePage,
} from 'types/reducerTypes';

export const initStateAboutUsForm = {
  title: '',
  content: '',
  imageURL: '',
};
export const reducerAboutUsForm = (
  state: AboutUsType,
  { type, payload }: ActionAboutUsForm
) => {
  return (state = { ...state, [type]: payload });
};

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
