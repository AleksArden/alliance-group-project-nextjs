// import SunEditorComponent from 'components/SunEditor/SunEditor';
import styles from './AdminProductDescriptionModal.module.scss';
import { Modal } from 'components/Modal/Modal';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import Editor from 'ckeditor5-custom-build';
import dynamic from 'next/dynamic';
import AdminButton from 'components/adminButton/AdminButton';

const MyEditor = dynamic(() => import('components/ckEditor/CKEditor'), {
  ssr: false,
});

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
  const currentProduct = searchParams.get('product');
  const router = useRouter();

  useEffect(() => {
    setText(description);
  }, [description]);
  const handleChangeContent = (
    event: string | unknown,
    editor: typeof Editor
  ) => {
    const data = editor.getData();
    setText(data);
  };

  return (
    <Modal adminRoute="products" isCloseBtn={false}>
      <label className={styles.label}>
        Опис продукції ({language})
        <div className={styles.wrapperCKEditor}>
          <MyEditor content={text} handleChangeContent={handleChangeContent} />
        </div>
      </label>
      <div className={styles.wrapperBtn}>
        <AdminButton
          btnName="Зберегти"
          onClick={() => {
            handleClick(type, text);
            router.replace(
              currentProduct
                ? `/admin/products?edit=true&product=${currentProduct}`
                : '/admin/products?modal=true',
              {
                scroll: false,
              }
            );
          }}
        />
        <AdminButton
          btnName="Повернутись"
          onClick={() => {
            router.replace(
              currentProduct
                ? `/admin/products?edit=true&product=${currentProduct}`
                : '/admin/products/?modal=true',
              {
                scroll: false,
              }
            );
          }}
          whiteBtn={true}
        />
      </div>
    </Modal>
  );
};
export default AdminProductDescriptionModal;
