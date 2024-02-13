import { revalidatePath } from 'next/cache';

export const getDataOnDemand = (pathes: string[]) => {
  pathes.forEach(path => {
    revalidatePath(path, 'page');
  });
};

export const pathesForProductCard = [
  '/[locale]/(marketing)',
  '/[locale]/(marketing)/products-services',
  '/[locale]/(marketing)/products-services/[slug]',
  '/(adminPage)/admin/(dashboard)/products',
];
export const pathesForServiseCard = [
  '/[locale]/(marketing)',
  '/[locale]/(marketing)/products-services',
  '/[locale]/(marketing)/products-services/[slug]',
  '/(adminPage)/admin/(dashboard)/services',
];

export const pathesForStaffCard = [
  '/[locale]/(marketing)/about-company',
  '/(adminPage)/admin/(dashboard)/staff',
];
