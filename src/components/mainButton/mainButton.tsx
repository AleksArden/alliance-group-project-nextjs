import styles from './mainButton.module.scss';

interface IProps {
  name: string | React.ReactNode;
  styleWrapperBtn: {
    width: number;
    borderColor: string;
    marginLeft?: string;
    height?: number;
    borderRadius?: string;
  };
  styleBtn: {
    width: number;
    height?: number;
    padding?: string;
    borderRadius?: string;
  };
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
