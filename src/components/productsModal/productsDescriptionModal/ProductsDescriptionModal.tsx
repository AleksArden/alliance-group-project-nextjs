import SunEditorComponent from 'components/SunEditor/SunEditor';
import styles from './ProductsDescriptionModal.module.scss';
import { Modal } from 'components/Modal/Modal';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface IProps {
  language: string;
  handleClick: (type: string, payload: string) => void;
  type: string;
}

const ProductsDescriptionModal = ({ language, handleClick, type }: IProps) => {
  const [text, setText] = useState('');
  const router = useRouter();
  const handleChangeContent = (content: string) => {
    setText(content);
  };
  return (
    <Modal route="products/?modal=true" isCloseBtn={false}>
      <label className={styles.label}>
        Опис продукції ({language})
        <div className={styles.wrapperSunEditor}>
          <SunEditorComponent
            content={text}
            handleChangeContent={handleChangeContent}
          />
        </div>
      </label>
      <div className={styles.wrapperBtn}>
        <button
          className={styles.button}
          type="button"
          onClick={() => {
            handleClick(type, text);
            console.log(text);
            router.push('/admin/products/?modal=true');
          }}
        >
          Зберегти
        </button>

        <Link className={styles.button} href={`/admin/products/?modal=true`}>
          Повернутись
        </Link>
      </div>
    </Modal>
  );
};
export default ProductsDescriptionModal;
