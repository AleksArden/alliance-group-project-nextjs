import styles from './MenuButton.module.scss';

interface IProps {
  locale: string;
  onToggle: () => void;
}

const MenuButton = ({ locale, onToggle }: IProps) => {
  return (
    <div className={styles.wrapperBtn}>
      <button className={styles.btn} type="button" onClick={onToggle}>
        MENU
        <div className={styles.menuIcon}></div>
      </button>
    </div>
  );
};
export default MenuButton;
