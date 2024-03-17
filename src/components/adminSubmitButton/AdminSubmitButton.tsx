import styles from './AdminSubmitButton.module.scss';

interface IProps {
  btnName: string;
  idForm?: string;
  isLoading?: boolean;
}

const AdminSubmitButton = ({ btnName, idForm, isLoading }: IProps) => {
  return (
    <button
      form={idForm}
      className={styles.button}
      type="submit"
      disabled={isLoading ? true : false}
    >
      {isLoading ? 'Завантажується' : `${btnName}`}
    </button>
  );
};
export default AdminSubmitButton;
