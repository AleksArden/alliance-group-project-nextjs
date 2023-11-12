import { ProductType, ServiceType } from 'types/dataTypeForFirebase';

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

export const getName = (name: string) => {
  return name.split(' ').join('-').toLowerCase();
};
