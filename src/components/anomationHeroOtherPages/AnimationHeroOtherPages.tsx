'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './AnimationHeroOtherPages.module.scss';
import { motion } from 'framer-motion';

interface IProps {
  title: string;
  initial: number;
  top?: string;
}

const AnimationHeroOtherPages = ({ title, initial, top = '51px' }: IProps) => {
  const [isIntersecting, setIsIntersecting] = useState(false);

  const ref = useRef<any | null>();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      }
      // { rootMargin: '-100px' }
    );
    console.log('isIntersecting', isIntersecting);
    observer.observe(ref.current);

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
    // <motion.div
    //   initial={{ x: initial }}
    //   whileInView={{ x: 0 }}
    //   transition={{ delay: 1, type: 'spring' }}
    //   className={styles.title}
    //   style={{ top: top }}
    // >
    //   {title}
    // </motion.div>
  );
};
export default AnimationHeroOtherPages;
