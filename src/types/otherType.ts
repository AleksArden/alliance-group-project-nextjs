import { ProductServiceType, StaffType } from './dataTypeForFirebase';
export enum Lang {
  UK = 'uk',
  EN = 'en',
  TR = 'tr',
}

export type NavLink = {
  id: number;
  label: string;
  href: string;
};
export type CurrentAdmin = {};

export type ImageURLandImageNameType = {
  data: ProductServiceType | StaffType;
  files: FileList;
  imageName: string;
  nameCollection: string;
};

export type ImageURLandImageNameType2 = {
  filesImageURL: FileList;
  productName: string;
  nameCollection: string;
};
export type ImageURLType = {
  filesImageURL: FileList;
  imageName: string;
  productName: string;
  nameCollection: string;
};
export type InstagramPostType = {
  caption: string;
  id: string;
  media_type: string;
  media_url: string;
};
export type InstagramResponse = {
  data: InstagramPostType[];
  paging: {
    before: string;
    after: string;
  };
};
