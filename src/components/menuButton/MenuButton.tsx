import { useEffect, useState } from 'react';
import styles from './MenuButton.module.scss';
import { Lang } from 'types/otherType';
import { TranslationsMenuButton } from 'lang/translations';

interface IProps {
  locale: string;
  onToggle: () => void;
  isVisibleHeaderMenu: boolean;
}

const MenuButton = ({ locale, onToggle, isVisibleHeaderMenu }: IProps) => {
  const [nameBtn, setNameBtn] = useState('');

  useEffect(() => {
    switch (locale) {
      case Lang.UK:
        {
          isVisibleHeaderMenu
            ? setNameBtn(TranslationsMenuButton.uk[1])
            : setNameBtn(TranslationsMenuButton.uk[0]);
        }
        break;
      case Lang.EN:
        {
          isVisibleHeaderMenu
            ? setNameBtn(TranslationsMenuButton.en[1])
            : setNameBtn(TranslationsMenuButton.en[0]);
        }
        break;
      default:
        {
          isVisibleHeaderMenu
            ? setNameBtn(TranslationsMenuButton.tr[1])
            : setNameBtn(TranslationsMenuButton.tr[0]);
        }
        break;
    }
  }, [locale, isVisibleHeaderMenu]);
  return (
    <div className={styles.wrapperBtn}>
      <button className={styles.btn} type="button" onClick={onToggle}>
        {nameBtn}
        {isVisibleHeaderMenu ? (
          <div className={styles.menuIconClose}></div>
        ) : (
          <div className={styles.menuIconOpen}></div>
        )}
      </button>
    </div>
  );
};
export default MenuButton;
