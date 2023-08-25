import { AboutUsType } from 'types/dataTypeForFirebase';
import { ActionAboutUsForm } from 'types/reducerTypes';

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
