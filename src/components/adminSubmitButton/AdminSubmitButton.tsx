import { experimental_useFormStatus as useFormStatus } from 'react-dom';
import styles from './AdminSubmitButton.module.scss';

const AdminSubmitButton = ({ btnName }: { btnName: string }) => {
  const { pending } = useFormStatus();
  console.log(pending);
  return (
    <button type="submit" aria-disabled={pending} className={styles.button}>
      {pending ? 'Submitting...' : btnName}
    </button>
  );
};
export default AdminSubmitButton;
