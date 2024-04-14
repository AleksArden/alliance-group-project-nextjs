import { Lang } from 'types/otherType';

export type ContactsEmailFormType = {
  title: string;
  button: string;
  name: string;
  phoneNumber: string;
  mail: string;
  text: string;
  messageSuccess: string;
  message: string;
  nameError: {
    required: string;
    min: string;
    max: string;
  };
  phoneNumberError: {
    matches: string;
    required: string;
  };
  mailError: {
    required: string;
    mail: string;
  };
  textError: {
    required: string;
    min: string;
    max: string;
  };
};

type ArrayTranslations = Record<Lang, string[]>;
type ObjectTranslations = Record<Lang, ContactsEmailFormType>;
type Translations = Record<Lang, string>;

export const TranslationsContactsEmailForm: ObjectTranslations = {
  uk: {
    title: 'Напишить нам',
    button: 'Надіслати',
    name: `Ваше ім'я*`,
    phoneNumber: 'Ваш телефон*',
    mail: 'Ваш e-mail*',
    text: 'Ваше повідомлення*',
    messageSuccess: '<p>Повідомлення було успішно відправлено!</p>',
    message:
      "<p>Тимчасово відправка повідомлень не працює. Для зв'язку з представником компанії використовуйте <a href='mailto: alliancegrouptm.ua@gmail.com'>alliancegrouptm@ukr.net</a>, або будь який інший спосіб, вказаний на цій сторінці.</p>",
    nameError: {
      required: "Ім'я є обов'язковим",
      min: "Надто коротке ім'я!",
      max: "Надто довге ім'я!",
    },
    phoneNumberError: {
      matches: 'Номер повинен складатися з 12 цифр',
      required: "Номер телефону обов'язковий",
    },
    mailError: {
      required: 'Електронна пошта обов’язкова',
      mail: 'Недійсна електронна адреса',
    },
    textError: {
      required: "Повідомлення є обов'язковим",
      min: 'Надто коротке повідомлення!',
      max: 'Надто довге повідомлення!',
    },
  },
  en: {
    title: 'Write to us',
    button: 'Send',
    name: 'Your name*',
    phoneNumber: 'Your phone*',
    mail: 'Your e-mail*',
    text: 'Your message*',
    messageSuccess: '<p>The message was sent successfully!</p>',
    message:
      "<p>Sending messages is temporarily not working. To contact a representative of the company, use <a href='mailto: alliancegrouptm.ua@gmail.com'>alliancegrouptm@ukr.net</a>, or any other method indicated on this page.</p>",
    nameError: {
      required: 'Name is Required',
      min: 'Too Short!',
      max: 'Too Long!',
    },
    phoneNumberError: {
      matches: 'Number should be 12 digits long',
      required: 'Phone Number is Required',
    },
    mailError: {
      required: 'Email is Required',
      mail: 'Invalid Email',
    },
    textError: {
      required: 'Message is Required',
      min: 'Too Short!',
      max: 'Too Long!',
    },
  },
  tr: {
    title: 'Bize yazın',
    button: 'Ilet',
    name: 'Adınız*',
    phoneNumber: 'Telefonunuz*',
    mail: 'E-posta adresiniz*',
    text: 'Mesaj*',
    messageSuccess: '<p>Mesaj başarıyla gönderildi!</p>',
    message:
      "<p>Mesaj gönderme işlemi geçici olarak çalışmıyor. Şirketin bir temsilcisiyle iletişime geçmek için <a href='mailto: alliancegrouptm.ua@<br>gmail.com'>alliancegrouptm@ukr.net</a> adresini veya bu sayfada belirtilen diğer herhangi bir yöntemi kullanın.</p>",
    nameError: {
      required: 'İsim gerekli',
      min: 'Çok kısa!',
      max: 'Çok uzun!',
    },
    phoneNumberError: {
      matches: 'Numara 12 hane uzunluğunda olmalıdır',
      required: 'Telefon Numarası Gerekli',
    },
    mailError: {
      required: 'Email gereklidir',
      mail: 'Geçersiz e-posta',
    },
    textError: {
      required: 'Mesaj Gerekli',
      min: 'Çok kısa!',
      max: 'Çok uzun!',
    },
  },
};
export const TranslationsMenuButton: Readonly<ArrayTranslations> = {
  uk: ['Меню', 'Закрити'],
  en: ['Menu', 'Close'],
  tr: ['Menü', 'Kapat'],
};
export const TranslationsNameBtnContentHeroHome: Readonly<Translations> = {
  uk: 'Зв’яжіться з нами',
  en: 'Contact us',
  tr: 'Bize Ulaşın',
};
export const TranslationsNameProductCardButton: Readonly<Translations> = {
  uk: 'Замовити',
  en: 'Order',
  tr: 'Sipariş',
};
export const TranslationsNameBtnProductServicesPage: Readonly<Translations> = {
  uk: 'Детальніше',
  en: 'More details',
  tr: 'Daha fazla detay',
};
