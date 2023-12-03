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
