'use client';

import { arrayCompanyName } from 'helpers/functions';
import styles from './AnimationHeroHome.module.scss';

import { useEffect, useRef, useState } from 'react';

interface IProps {
  title: string;
}

const AnimationHeroHome = ({ title }: IProps) => {
  const [isIntersecting, setIsIntersecting] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { rootMargin: '200px' }
    );
    console.log('isIntersecting', isIntersecting);
    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [isIntersecting]);
  return (
    <div ref={ref}>
      <div
        className={
          isIntersecting
            ? styles.animationFirstPartCompanyName
            : styles.firstPartCompanyName
        }
      >
        <p>{arrayCompanyName(title)[0]}</p>
      </div>
      <div
        className={
          isIntersecting
            ? styles.animationSecondPartCompanyName
            : styles.secondPartCompanyName
        }
      >
        <p>{arrayCompanyName(title)[1]}</p>
      </div>
    </div>
  );
};
export default AnimationHeroHome;
