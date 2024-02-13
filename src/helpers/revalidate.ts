import { revalidatePath } from 'next/cache';

export const getDataOnDemand = (pathes: string[]) => {
  pathes.forEach(path => {
    revalidatePath(path, 'page');
  });
};

// =======================================================================
export const pathesForProductCard = [
  '/[locale]/(marketing)',
  '/[locale]/(marketing)/products-services',
  '/[locale]/(marketing)/products-services/[slug]',
  '/(adminPage)/admin/(dashboard)/products',
];
// _______________________________
export const pathesForServiseCard = [
  '/[locale]/(marketing)',
  '/[locale]/(marketing)/products-services',
  '/[locale]/(marketing)/products-services/[slug]',
  '/(adminPage)/admin/(dashboard)/services',
];
// __________________________________
export const pathesForStaffCard = [
  '/[locale]/(marketing)/about-company',
  '/(adminPage)/admin/(dashboard)/staff',
];
// __________________________________
export const pathesForHomePageForm = [
  '/[locale]/(marketing)',
  '/(adminPage)/admin/(dashboard)/home-main',
];
// ___________________________________
export const pathesForContactsForm = [
  '/[locale]/(marketing)/contacts',
  '/(adminPage)/admin/(dashboard)/contacts',
];
// __________________________________
export const pathesForAboutCompanyForm = [
  '/[locale]/(marketing)/about-company',
  '/(adminPage)/admin/(dashboard)/about-company',
];
// _____________________________________
export const pathesForGalleryForm = [
  '/[locale]/(marketing)/gallery',
  '/(adminPage)/admin/(dashboard)/gallery',
];
// _____________________________________
export const pathesForProductsServicesForm = [
  '/[locale]/(marketing)/products-services',
  '/(adminPage)/admin/(dashboard)/products-services',
];
// _____________________________________
export const pathesForIntroForm = [
  '/[locale]/(marketing)',
  '/(adminPage)/admin/(dashboard)/home-intro',
];
// _________________________________
export const pathesForHomeProductsForm = [
  '/[locale]/(marketing)',
  '/(adminPage)/admin/(dashboard)/home-products',
];
// ________________________________
export const pathesForHomeServicesForm = [
  '/[locale]/(marketing)',
  '/(adminPage)/admin/(dashboard)/home-services',
];
