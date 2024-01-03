// import SunEditorComponent from 'components/SunEditor/SunEditor';
import styles from './AdminServicesDescriptionModal.module.scss';
import { Modal } from 'components/Modal/Modal';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

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
  const service = searchParams.get('service');
  const router = useRouter();

  useEffect(() => {
    setText(description);
  }, [description]);
  const handleChangeContent = (content: string) => {
    setText(content);
  };
  return (
    <Modal adminRoute="services" isCloseBtn={false}>
      {/* <label className={styles.label}>
        Опис послуги ({language})
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
              service
                ? `/admin/services?edit=true&service=${service}`
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
            handleClick(type, text);
            router.replace(
              service
                ? `/admin/services?edit=true&service=${service}`
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