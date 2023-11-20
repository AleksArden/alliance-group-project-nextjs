'use client';
import { ReactNode, useCallback, useEffect } from 'react';

import { useRouter } from 'next/navigation';
import styles from './Modal.module.scss';

interface IProps {
  children: ReactNode;
  isCloseBtn?: boolean;
  route: string;
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
      router.replace(`/admin/${route}`, {
        scroll: false,
      });
    }
  }

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
