import styles from './mainButton.module.scss';

interface IProps {
  name: string;
  styleWrapperBtn: { width: number; borderColor: string };
  styleBtn: { width: number };
  onClick: () => void;
}

const MainButton = ({ name, styleWrapperBtn, styleBtn, onClick }: IProps) => {
  return (
    <div className={styles.wrapperBtn} style={styleWrapperBtn}>
      <button
        className={styles.btn}
        style={styleBtn}
        onClick={onClick}
        type="button"
      >
        {name}
      </button>
    </div>
  );
};
export default MainButton;
