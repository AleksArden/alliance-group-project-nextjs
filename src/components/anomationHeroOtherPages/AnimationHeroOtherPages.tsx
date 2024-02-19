'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './AnimationHeroOtherPages.module.scss';

interface IProps {
  title: string | undefined;
  top?: string | undefined;
}

const AnimationHeroOtherPages = ({ title, top = '51px' }: IProps) => {
  const [isIntersecting, setIsIntersecting] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { rootMargin: '100px' }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [isIntersecting]);
  return (
    <div ref={ref}>
      <div
        style={{ top: top }}
        className={isIntersecting ? styles.animationTitle : styles.title}
      >
        <p>{title}</p>
      </div>
    </div>
  );
};
export default AnimationHeroOtherPages;
