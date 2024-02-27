import { v4 as uuidv4 } from 'uuid';
import {
  GalleryImageURLType,
  ProductServiceType,
} from 'types/dataTypeForFirebase';
import {
  uploadImageToStorage,
  uploadImageToStorageWithNameEN,
} from '@/firebase/uploadAndDeleteImage';
import {
  ArrayImagesURL,
  ImageURLType,
  ImageURLandImageNameType,
} from 'types/otherType';
// =====================================================================
export const arrayCompanyName = (name: string) => {
  let companyName: string[] = [];
  name?.split(' ').forEach(item => {
    if (item !== '') {
      companyName.push(item);
    }
  });
  // ___________________
  const secondPartCompanyName = companyName.splice(1, 2).join(' ');
  companyName.push(secondPartCompanyName);

  return companyName;
};
// ===========================================================================

type sliderSettingsType = {
  perPage: number;
  width: number;
};
// __________________
export const getSliderSettings = (
  products: ProductServiceType[],
  ...device: string[]
): sliderSettingsType => {
  let settingObject: sliderSettingsType;

  if (products.length === 1) {
    if (device[0] === 'mobile') {
      return (settingObject = {
        perPage: 1,
        width: 360,
      });
    } else {
      return (settingObject = {
        perPage: 1,
        width: 600,
      });
    }
  } else if (products.length === 2) {
    if (device[0] === 'mobile') {
      return (settingObject = {
        perPage: 1,
        width: 770,
      });
    } else {
      return (settingObject = {
        perPage: 2,
        width: 1280,
      });
    }
  } else {
    if (device[0] === 'mobile') {
      return (settingObject = {
        perPage: 1,
        width: 1180,
      });
    } else {
      return (settingObject = {
        perPage: 3,
        width: 1960,
      });
    }
  }
};
// =========================================================================
export const getNameForAdressBar = (name: string) => {
  return name.split(' ').join('-');
};
// _____________________
export const getProductServiceName = (name: string) => {
  return name.split('-').join(' ');
};

//===================================================================================
export const getImageURL = async ({
  filesImageURL,
  imageName,
  productName,
  nameCollection,
}: ImageURLType): Promise<string | undefined> => {
  if (filesImageURL !== null) {
    const file = filesImageURL[0];

    const imageURL = await uploadImageToStorageWithNameEN({
      nameCollection,
      productName,
      imageName,
      file,
    });

    return imageURL;
  }
};
// ===========================================================================
export const getImageURLandImageName = async ({
  filesImageURL,
  productName,
  nameCollection,
}: ImageURLandImageNameType): Promise<GalleryImageURLType | undefined> => {
  if (filesImageURL !== null) {
    const file = filesImageURL[0];

    const imageName = uuidv4();
    const imageURL = await uploadImageToStorageWithNameEN({
      nameCollection,
      productName,
      imageName,
      file,
    });

    if (imageURL) {
      return { imageName, imageURL };
    }
  }
};
// ===============================================================
export const getArrayImagesURL = async ({
  arrayFilesImageURL,
  productName,
  nameCollection,
}: ArrayImagesURL): Promise<(GalleryImageURLType | undefined)[]> => {
  const arrayImageURLandImageName = await Promise.all(
    arrayFilesImageURL.map(async filesImageURL => {
      if (filesImageURL) {
        const imageURLandImageName = await getImageURLandImageName({
          filesImageURL,
          productName,
          nameCollection,
        });

        if (imageURLandImageName) {
          return imageURLandImageName;
        }
      }
    })
  );
  return arrayImageURLandImageName;
};
// ===================================================
export const getProductsServices = (
  products: ProductServiceType[] | undefined,
  services: ProductServiceType[] | undefined
): ProductServiceType[] => {
  let productsServices: ProductServiceType[] = [];
  if (products) {
    productsServices = [...products];
  }
  if (services) {
    productsServices = [...productsServices, ...services];
  }
  return productsServices;
};
// ============================================================
export const getPreviousProduct = (
  productsServices: ProductServiceType[],
  productName: string
): ProductServiceType => {
  const productIdx = productsServices.findIndex(
    product => product.nameEN === productName
  );
  const previousIdx =
    productIdx === 0 ? productsServices.length - 1 : productIdx - 1;
  return productsServices[previousIdx];
};
// ___________________________________

export const getNextProduct = (
  productsServices: ProductServiceType[],
  productName: string
): ProductServiceType => {
  const productIdx = productsServices.findIndex(
    product => product.nameEN === productName
  );
  const nextIdx = productIdx + 2 > productsServices.length ? 0 : productIdx + 1;
  return productsServices[nextIdx];
};
