import { Lang } from 'types/otherType';

type ArrayTranslations = Record<Lang, string[]>;
type Translations = Record<Lang, string>;

export const TranslationsContactsEmailForm: Readonly<ArrayTranslations> = {
  uk: [
    'Напишить нам',
    'Надіслати',
    `Ваше ім'я*`,
    'Ваш телефон*',
    'Ваш e-mail*',
    'Ваше повідомлення',
  ],
  en: [
    'Write to us',
    'Send',
    'Your name*',
    'Your phone*',
    'Your e-mail*',
    'Your message',
  ],
  tr: [
    'Bize yazın',
    'Ilet',
    'Adınız*',
    'Telefonunuz*',
    'E-posta adresiniz*',
    'Mesaj',
  ],
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
