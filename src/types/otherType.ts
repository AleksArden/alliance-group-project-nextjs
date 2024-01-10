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
export type GalleryProductsServicesFileType = {
  backgroundImageDesktop: FileList | null;
  backgroundImageTablet: FileList | null;
  backgroundImageMobile: FileList | null;
  imageURL1: FileList | null;
  imageURL2: FileList | null;
  imageURL3: FileList | null;
  imageURL4: FileList | null;
  imageURL5: FileList | null;
  imageURL6: FileList | null;
};
