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
      router.push(`/admin/${route}`);
    }
  }

  function handleClose({
    target,
    currentTarget,
  }: React.MouseEvent<HTMLDivElement>) {
    if (target === currentTarget) {
      router.push(`/admin/${route}`);
    }
  }

  return (
    <div className={styles.overlay} onClick={handleClose}>
      {isCloseBtn ? (
        <div className={styles.modalContainer}>
          <button
            onClick={() => router.push(`/admin/${route}`)}
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
