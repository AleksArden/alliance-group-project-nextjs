import { revalidatePath } from 'next/cache';

export const getDataOnDemand = (pathes: string[]) => {
  pathes.forEach(path => {
    revalidatePath(path, 'page');
  });
};

export const pathesForProductCard = [
  '/',
  '/uk',
  '/en',
  '/tr',
  '/products-services',
  '/uk/products-services',
  '/en/products-services',
  '/tr/products-services',
  '(adminPage)/admin/products',
];
export const pathesForServiseCard = [
  '/',
  '/uk',
  '/en',
  '/tr',
  '/products-services',
  '/uk/products-services',
  '/en/products-services',
  '/tr/products-services',
  '(adminPage)/admin/services',
];

export const pathesForStaffCard = [
  '/[locale]/(marketing)/about-company',
  '/(adminPage)/admin/(dashboard)/staff',
];
