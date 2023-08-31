import { AboutUsType, ContactsType } from 'types/dataTypeForFirebase';
import { ActionAboutUsForm, ActionContacts } from 'types/reducerTypes';

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
