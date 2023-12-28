import { ProductType, ServiceType, StaffType } from './dataTypeForFirebase';

export type NavLink = {
  id: number;
  label: string;
  href: string;
};
export type CurrentAdmin = {};

export type ImageURLandImageNameType = {
  data: ServiceType | ProductType | StaffType;
  files: FileList;
  imageName: string;
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
