import styles from './AdminButton.module.scss';
import { logout } from '@/firebase/logout';

interface IProps {
  btnName: string;
  idForm?: string;
  btnLogout?: boolean;
  type?: 'button' | 'submit';
  onClick?: () => void;
  style?: {
    width?: number;
    height?: number;
    fontSize?: number;
  };
  disabled?: boolean;
  whiteBtn?: boolean;
}

const AdminButton = ({
  btnName,
  btnLogout = false,
  onClick,
  style,
  disabled,
  whiteBtn = false,
  idForm,
  type = 'button',
}: IProps) => {
  const handleClickLogout = () => {
    logout();
  };

  return (
    <>
      {btnLogout ? (
        <button
          className={styles.button}
          type="button"
          onClick={handleClickLogout}
        >
          {btnName}
        </button>
      ) : (
        <button
          className={whiteBtn ? styles.whiteButton : styles.button}
          type={type}
          onClick={onClick}
          style={style}
          disabled={disabled}
          form={idForm}
        >
          {btnName}
        </button>
      )}
    </>
  );
};
export default AdminButton;
