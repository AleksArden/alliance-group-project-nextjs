'use client';
import { ReactNode, useCallback, useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';
import styles from './Modal.module.scss';

interface IProps {
  children: ReactNode;
  isCloseBtn?: boolean;
  adminRoute?: string;
  route?: string;
  locale?: string;
  isGalleryModal?: boolean;
  isInstagramModal?: boolean;
}
interface KeyboardEvent {
  code: string;
}

export const Modal = ({
  children,
  adminRoute,
  route,
  locale,
  isCloseBtn = true,
  isGalleryModal = false,
  isInstagramModal = false,
}: IProps) => {
  const router = useRouter();
  const memoKeyClose = useCallback(handleKeyClose, [handleKeyClose]);
  // const [isModal, setIsModal] = useState(false);

  // useEffect(() => {
  //   if (route || adminRoute) {
  //     setIsModal(true);
  //   }
  // }, [route, adminRoute]);

  useEffect(() => {
    window.addEventListener('keydown', memoKeyClose);

    return () => {
      window.removeEventListener('keydown', memoKeyClose);
    };
  }, [memoKeyClose]);

  const handleClickBackdropClose = (evt: React.MouseEvent<HTMLDivElement>) => {
    if (route && evt.target === evt.currentTarget)
      router.replace(`/${locale}/${route}`, {
        scroll: false,
      });
  };

  function handleKeyClose({ code }: KeyboardEvent) {
    if (code === 'Escape') {
      {
        adminRoute &&
          router.replace(`/admin/${adminRoute}`, {
            scroll: false,
          });
      }
      {
        route &&
          router.replace(`/${locale}/${route}`, {
            scroll: false,
          });
      }
    }
  }

  return (
    <div className={styles.overlay} onClick={handleClickBackdropClose}>
      {isCloseBtn ? (
        <div
          className={
            isGalleryModal ? styles.galleryModal : styles.modalContainer
          }
        >
          <button
            onClick={
              adminRoute
                ? () =>
                    router.replace(`/admin/${adminRoute}`, {
                      scroll: false,
                    })
                : () =>
                    router.replace(`/${locale}/${route}`, {
                      scroll: false,
                    })
            }
            className={
              isGalleryModal ? styles.closeModalInstagramBtn : styles.closeBtn
            }
            type="button"
          >
            {isGalleryModal ? (
              isInstagramModal ? (
                <div className={styles.iconCloseInstagramModal}></div>
              ) : (
                <div className={styles.iconCloseGalleryModal}></div>
              )
            ) : (
              'X'
            )}
          </button>
          {children}
        </div>
      ) : (
        <div className={styles.smallModalContainer}>{children}</div>
      )}
    </div>
  );
};
