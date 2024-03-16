import Content from 'components/content/Content';
import styles from './ModalContactsEmailForm.module.scss';

interface IProps {
  isModal: boolean;
  message: string;
}

const ModalContactsEmailForm = ({ isModal, message }: IProps) => {
  return (
    <div className={isModal ? styles.showModal : styles.modal}>
      <div className={styles.text}>
        <Content content={message} />
      </div>
    </div>
  );
};
export default ModalContactsEmailForm;
