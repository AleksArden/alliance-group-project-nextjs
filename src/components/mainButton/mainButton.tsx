import styles from './mainButton.module.scss';

interface IProps {
  name: string;
  styleWrapperBtn: { width: number; borderColor: string; marginLeft?: string };
  styleBtn: { width: number };
  onClick?: () => void;
  type: 'button' | 'submit';
}

const MainButton = ({
  name,
  styleWrapperBtn,
  styleBtn,
  onClick,
  type,
}: IProps) => {
  return (
    <div className={styles.wrapperBtn} style={styleWrapperBtn}>
      <button
        className={styles.btn}
        style={styleBtn}
        onClick={onClick}
        type={type}
      >
        {name}
      </button>
    </div>
  );
};
export default MainButton;
