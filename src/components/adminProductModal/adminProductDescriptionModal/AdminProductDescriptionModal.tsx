// import SunEditorComponent from 'components/SunEditor/SunEditor';
import styles from './AdminProductDescriptionModal.module.scss';
import { Modal } from 'components/Modal/Modal';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface IProps {
  language: string;
  handleClick: (type: string, payload: string) => void;
  type: string;
  description: string;
}

const AdminProductDescriptionModal = ({
  language,
  handleClick,
  type,
  description,
}: IProps) => {
  const [text, setText] = useState('');
  const searchParams = useSearchParams();
  const product = searchParams.get('product');
  const router = useRouter();

  useEffect(() => {
    setText(description);
  }, [description]);
  const handleChangeContent = (content: string) => {
    setText(content);
  };
  return (
    <Modal adminRoute="products" isCloseBtn={false}>
      {/* <label className={styles.label}>
        Опис продукції ({language})
        <div className={styles.wrapperSunEditor}>
          <SunEditorComponent
            content={text}
            handleChangeContent={handleChangeContent}
          />
        </div>
      </label> */}
      <div className={styles.wrapperBtn}>
        <button
          className={styles.button}
          type="button"
          onClick={() => {
            handleClick(type, text);
            router.replace(
              product
                ? `/admin/products?edit=true&product=${product}`
                : '/admin/products?modal=true',
              {
                scroll: false,
              }
            );
          }}
        >
          Зберегти
        </button>

        <button
          className={styles.button}
          type="button"
          onClick={() => {
            handleClick(type, text);
            router.replace(
              product
                ? `/admin/products?edit=true&product=${product}`
                : '/admin/products/?modal=true',
              {
                scroll: false,
              }
            );
          }}
        >
          Повернутись
        </button>
      </div>
    </Modal>
  );
};
export default AdminProductDescriptionModal;
