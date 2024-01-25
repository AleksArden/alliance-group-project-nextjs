'use client';

import Typewriter from 'components/typewriter/Typewriter';
import styles from './AnimationIntro.module.scss';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface IProps {
  text: string;
  // initial: number;
  sign: string;
}

const AnimationIntro = ({ text, sign }: IProps) => {
  const [isIntersecting, setIsIntersecting] = useState(false);

  const ref = useRef<any | null>();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { rootMargin: '-200px' }
    );
    console.log('isIntersecting', isIntersecting);
    observer.observe(ref.current);

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

      {/* <motion.div
        initial={{ x: initial }}
        whileInView={{ x: 0 }}
        transition={{ delay: 1, type: 'spring' }}
        className={styles.text}
      >
        {text}
      </motion.div>
      <div className={styles.container} ref={scrollRef}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ root: scrollRef }}
        >
          <Typewriter text={text} speed={25} />
          <p className={styles.sign}>{sign}</p>
        </motion.div>
      </div> */}
    </div>
  );
};
export default AnimationIntro;
