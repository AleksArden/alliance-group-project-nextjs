import { v4 as uuidv4 } from 'uuid';
import { ProductType, ServiceType } from 'types/dataTypeForFirebase';
import { uploadImageToStorage } from '@/firebase/uploadAndDeleteImage';
import { ImageURLandImageNameType } from 'types/otherType';

export const arrayCompanyName = (name: string) => {
  let companyName: string[] = [];
  name.split(' ').forEach(item => {
    if (item !== '') {
      companyName.push(item);
    }
  });

  const secondPartCompanyName = companyName.splice(1, 2).join(' ');
  companyName.push(secondPartCompanyName);

  return companyName;
};

type sliderSettingsType = {
  perPage: number;
  width: number;
};

export const getSliderSettings = (
  products: ProductType[] | ServiceType[]
): sliderSettingsType => {
  let settingObject: sliderSettingsType;

  if (products.length === 1) {
    return (settingObject = {
      perPage: 1,
      width: 600,
    });
  } else if (products.length === 2) {
    return (settingObject = {
      perPage: 2,
      width: 1280,
    });
  } else {
    return (settingObject = {
      perPage: 3,
      width: 1960,
    });
  }
};

export const getNameForAdressBar = (name: string) => {
  return name.split(' ').join('-').toLowerCase();
};

export const getImageURLandImageName = async ({
  data,
  files,
  imageName,
  nameCollection,
}: ImageURLandImageNameType) => {
  if (files !== null) {
    const file = files[0];
    if (!data.id) {
      const name = uuidv4();
      const imageURL = await uploadImageToStorage(nameCollection, name, file);

      return { imageName: name, imageURL: imageURL };
    } else {
      const imageURL = await uploadImageToStorage(
        nameCollection,
        imageName,
        file
      );

      return { imageName, imageURL: imageURL };
    }
  }
};
