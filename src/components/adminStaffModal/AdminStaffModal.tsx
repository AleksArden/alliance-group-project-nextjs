import { Modal } from 'components/Modal/Modal';
import poster from '../../../public/posters/poster-not-found.jpg';
import styles from './AdminStaffModal.module.scss';

import Image from 'next/image';

import { useEffect, useReducer, useState } from 'react';
import { useRouter } from 'next/navigation';

import { StaffType } from 'types/dataTypeForFirebase';
import { initStateStaff, reducerStaff } from 'helpers/reducer';
import { useUploadImageFile } from 'hooks/useUploadImageFile';
import { ActionsStaff } from 'types/reducerTypes';
import { getImageURL } from 'helpers/functions';
import { submitStaffCard } from 'app/api/actionCard/actionsCard';

import AdminLoading from 'app/(adminPage)/loading';
import AdminButton from 'components/adminButton/AdminButton';

interface IProps {
  data?: StaffType;
  btnName: string;
  id?: number;
}

const AdminStaffModal = ({ data, btnName, id }: IProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const [state, dispatch] = useReducer(reducerStaff, initStateStaff);

  const {
    imageURL,
    nameUA,
    nameEN,
    nameTR,
    positionUA,
    positionEN,
    positionTR,
    descriptionUA,
    descriptionEN,
    descriptionTR,
  } = state;

  const [filesImageURL, setFilesImageURL] = useState<FileList | null>();
  const { blobImageURL, handleSelectFile } = useUploadImageFile();
  useEffect(() => {
    if (blobImageURL) {
      dispatch({ type: 'imageURL', payload: blobImageURL } as ActionsStaff);
    }
  }, [blobImageURL]);

  useEffect(() => {
    console.log('useEffect-staff', data);
    if (data) {
      const keys = Object.keys(data);
      keys.forEach(key => {
        dispatch({
          type: key,
          payload: data[key as keyof typeof data],
        } as ActionsStaff);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleChange = ({
    target: { name, value },
  }:
    | React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({ type: name, payload: value } as ActionsStaff);
  };

  const handleSubmit = async (
    evt: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    evt.preventDefault();
    const data: StaffType = state;
    setIsLoading(true);

    if (id) {
      data.id = id;
      data.staffName = nameEN;
    }

    if (filesImageURL) {
      const imageURL = await getImageURL({
        nameCollection: 'staff',
        filesImageURL,
        productName: data.staffName,
        imageName: 'imageURL',
      });

      if (imageURL) {
        data.imageURL = imageURL;
      }
    }

    await submitStaffCard(data);

    router.replace('/admin/staff', {
      scroll: false,
    });
    setIsLoading(false);
  };
  return (
    <Modal adminRoute="staff">
      {isLoading && <AdminLoading />}
      <form autoComplete="off" onSubmit={handleSubmit}>
        <div className={styles.container}>
          <div>
            <label className={styles.label}>
              Зображення
              <input
                className={styles.inputImage}
                type="file"
                name="image"
                accept=".jpg, .jpeg, .png"
                onChange={({ target: { files } }) => {
                  handleSelectFile(files);
                  setFilesImageURL(files);
                }}
              />
              <div className={styles.wrapperImage}>
                <Image
                  src={imageURL ? imageURL : poster}
                  fill
                  alt="The photo of staff"
                  priority
                  className={styles.image}
                  sizes="280px"
                />
              </div>
            </label>
          </div>
          <div className={styles.inputContainer}>
            <label className={styles.label}>
              Ім&apos;я та Призвище (UA)
              <input
                className={styles.input}
                type="text"
                name="nameUA"
                value={nameUA}
                onChange={handleChange}
              />
            </label>
            <label className={styles.label}>
              Ім&apos;я та Призвище (EN)
              <input
                className={styles.input}
                type="text"
                name="nameEN"
                value={nameEN}
                onChange={handleChange}
              />
            </label>
            <label className={styles.label}>
              Ім&apos;я та Призвище (TR)
              <input
                className={styles.input}
                type="text"
                name="nameTR"
                value={nameTR}
                onChange={handleChange}
              />
            </label>
            <label className={styles.label}>
              Посада (UA)
              <input
                className={styles.input}
                type="text"
                name="positionUA"
                value={positionUA}
                onChange={handleChange}
              />
            </label>
            <label className={styles.label}>
              Посада (EN)
              <input
                className={styles.input}
                type="text"
                name="positionEN"
                value={positionEN}
                onChange={handleChange}
              />
            </label>
            <label className={styles.label}>
              Посада (TR)
              <input
                className={styles.input}
                type="text"
                name="positionTR"
                value={positionTR}
                onChange={handleChange}
              />
            </label>
          </div>
        </div>
        <label className={styles.label}>
          Характеристика (UA)
          <textarea
            className={styles.textarea}
            name="descriptionUA"
            rows={3}
            value={descriptionUA}
            onChange={handleChange}
          ></textarea>
        </label>
        <label className={styles.label}>
          Характеристика (EN)
          <textarea
            className={styles.textarea}
            name="descriptionEN"
            rows={3}
            value={descriptionEN}
            onChange={handleChange}
          ></textarea>
        </label>
        <label className={styles.label}>
          Характеристика (TR)
          <textarea
            className={styles.textarea}
            name="descriptionTR"
            rows={3}
            value={descriptionTR}
            onChange={handleChange}
          ></textarea>
        </label>

        <AdminButton
          btnName={isLoading ? 'Завантажується' : btnName}
          disabled={isLoading ? true : false}
          type="submit"
        />
      </form>
    </Modal>
  );
};
export default AdminStaffModal;
