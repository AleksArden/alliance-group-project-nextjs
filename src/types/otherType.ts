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
  filesImageURL: FileList;
  productName: string;
  nameCollection: string;
};

export type ArrayImagesURL = {
  arrayFilesImageURL: (FileList | null)[];
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

// =====================================================
export type NavItemType = {
  id: number;
  label: string;
  href: string;
};
// =====================================================

export type MessageType = {
  name: string;
  phoneNumber: string;
  email: string;
  text: string;
};
//================================================================
