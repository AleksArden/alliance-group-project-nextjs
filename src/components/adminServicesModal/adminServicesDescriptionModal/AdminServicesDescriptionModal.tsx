// import SunEditorComponent from 'components/SunEditor/SunEditor';
import styles from './AdminServicesDescriptionModal.module.scss';
import { Modal } from 'components/Modal/Modal';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import Editor from 'ckeditor5-custom-build';
import dynamic from 'next/dynamic';

const MyEditor = dynamic(() => import('components/ckEditor/CKEditor'), {
  ssr: false,
});

interface IProps {
  language: string;
  handleClick: (type: string, payload: string) => void;
  type: string;
  description: string;
}

const AdminServicesDescriptionModal = ({
  language,
  handleClick,
  type,
  description,
}: IProps) => {
  const [text, setText] = useState('');

  const searchParams = useSearchParams();
  const currentService = searchParams.get('service');
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
    <Modal adminRoute="services" isCloseBtn={false}>
      <label className={styles.label}>
        Опис послуги ({language})
        <div className={styles.wrapperCKEditor}>
          <MyEditor content={text} handleChangeContent={handleChangeContent} />
        </div>
      </label>
      <div className={styles.wrapperBtn}>
        <button
          className={styles.button}
          type="button"
          onClick={() => {
            handleClick(type, text);
            router.replace(
              currentService
                ? `/admin/services?edit=true&service=${currentService}`
                : '/admin/services?modal=true',
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
            router.replace(
              currentService
                ? `/admin/services?edit=true&service=${currentService}`
                : '/admin/services/?modal=true',
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
export default AdminServicesDescriptionModal;
