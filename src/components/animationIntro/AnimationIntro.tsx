'use client';

import Typewriter from 'components/typewriter/Typewriter';
import styles from './AnimationIntro.module.scss';
import { motion } from 'framer-motion';
import { useRef } from 'react';

interface IProps {
  text: string;
  initial: number;
  sign: string;
}

const AnimationIntro = ({ text, initial, sign }: IProps) => {
  const scrollRef = useRef(null);
  return (
    <>
      <motion.div
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
      </div>
    </>
  );
};
export default AnimationIntro;
