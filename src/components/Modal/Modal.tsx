'use client';
import { ReactNode, useCallback, useEffect } from 'react';

import { useRouter } from 'next/navigation';
import styles from './Modal.module.scss';
import { deleteFile } from '@/firebase/deleteData';

interface IProps {
  children: ReactNode;
  isCloseBtn?: boolean;
  route: string;
  fileName?: string;
}
interface KeyboardEvent {
  code: string;
}

export const Modal = ({ children, route, isCloseBtn = true }: IProps) => {
  const router = useRouter();
  const memoKeyClose = useCallback(handleKeyClose, [handleKeyClose]);

  useEffect(() => {
    window.addEventListener('keydown', memoKeyClose);

    return () => {
      window.removeEventListener('keydown', memoKeyClose);
    };
  }, [memoKeyClose]);

  function handleKeyClose({ code }: KeyboardEvent) {
    if (code === 'Escape') {
    }
  }

  // function handleClose({
  //   target,
  //   currentTarget,
  // }: React.MouseEvent<HTMLDivElement>) {
  //   if (target === currentTarget) {
  //     router.replace(`/admin/${route}`, {
  //       scroll: false,
  //     });
  //   }
  // }

  return (
    <div className={styles.overlay}>
      {isCloseBtn ? (
        <div className={styles.modalContainer}>
          <button
            onClick={() =>
              router.replace(`/admin/${route}`, {
                scroll: false,
              })
            }
            className={styles.closeBtn}
            type="button"
          >
            X
          </button>
          {children}
        </div>
      ) : (
        <div className={styles.smallModalContainer}>{children}</div>
      )}
    </div>
  );
};
