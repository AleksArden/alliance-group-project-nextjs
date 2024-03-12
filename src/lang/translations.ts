import { Lang } from 'types/otherType';

export type ContactsEmailForm = {
  title: string;
  button: string;
  name: string;
  phoneNumber: string;
  mail: string;
  text: string;
  message: string;
};

type ArrayTranslations = Record<Lang, string[]>;
type ObjectTranslations = Record<Lang, ContactsEmailForm>;
type Translations = Record<Lang, string>;

export const TranslationsContactsEmailForm: ObjectTranslations = {
  uk: {
    title: 'Напишить нам',
    button: 'Надіслати',
    name: `Ваше ім'я*`,
    phoneNumber: 'Ваш телефон*',
    mail: 'Ваш e-mail*',
    text: 'Ваше повідомлення*',
    message:
      "Тимчасово відправка повідомлень не працює. Для зв'язку з представником компанії використовуйте alliancegrouptm@ukr.net, або будь який інший спосіб, вказаний на цій сторінці.",
  },
  en: {
    title: 'Write to us',
    button: 'Send',
    name: 'Your name*',
    phoneNumber: 'Your phone*',
    mail: 'Your e-mail*',
    text: 'Your message*',
    message:
      'Sending messages is temporarily not working. To contact a representative of the company, use alliancegrouptm@ukr.net, or any other method indicated on this page.',
  },
  tr: {
    title: 'Bize yazın',
    button: 'Ilet',
    name: 'Adınız*',
    phoneNumber: 'Telefonunuz*',
    mail: 'E-posta adresiniz*',
    text: 'Mesaj*',
    message:
      'Mesaj gönderme işlemi geçici olarak çalışmıyor. Şirketin bir temsilcisiyle iletişime geçmek için alliancegrouptm@ukr.net adresini veya bu sayfada belirtilen diğer herhangi bir yöntemi kullanın.',
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
