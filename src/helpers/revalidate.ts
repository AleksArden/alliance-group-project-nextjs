import { revalidatePath } from 'next/cache';

export const getDataOnDemand = (pathes: string[]) => {
  pathes.forEach(path => {
    revalidatePath(path);
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
  '/admin/products',
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
  '/admin/services',
];
