import { useEffect, useState } from 'react';
import styles from './MenuButton.module.scss';
import { Lang } from 'types/otherType';

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
          isVisibleHeaderMenu ? setNameBtn('Закрити') : setNameBtn('Меню');
        }
        break;
      case Lang.EN:
        {
          isVisibleHeaderMenu ? setNameBtn('Close') : setNameBtn('Menu');
        }
        break;
      default:
        {
          isVisibleHeaderMenu ? setNameBtn('kapalı') : setNameBtn('Menü');
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
