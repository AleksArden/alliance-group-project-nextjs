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
  // const scrollRef = useRef(null);

  const [isIntersecting, setIsIntersecting] = useState(false);
  const [isSlideIn, setIsSlideIn] = useState(false);
  console.log('isSlideIn', isSlideIn);
  const ref = useRef<any | null>();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
        if (isIntersecting) {
          setIsSlideIn(true);
        } else {
          setIsSlideIn(false);
        }
      },
      { rootMargin: '-100px' }
    );
    console.log('isIntersecting', isIntersecting);
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [isIntersecting]);

  return (
    <div ref={ref}>
      <div className={isSlideIn ? styles.animationText : styles.text}>
        {text}
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
