'use client';

import Typewriter from 'components/typewriter/Typewriter';
import styles from './AnimationIntro.module.scss';

import { useEffect, useRef, useState } from 'react';

interface IProps {
  text: string;
  sign: string;
}

const AnimationIntro = ({ text, sign }: IProps) => {
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
      <div className={isIntersecting ? styles.animationText : styles.text}>
        <p>{text}</p>
      </div>
      <div className={styles.container}>
        {isIntersecting && <Typewriter text={text} speed={25} />}

        <p className={isIntersecting ? styles.signVisible : styles.sign}>
          {sign}
        </p>
      </div>
    </div>
  );
};
export default AnimationIntro;
