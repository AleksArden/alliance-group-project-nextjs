'use client';

import styles from './AnimationHeroOtherPages.module.scss';
import { motion } from 'framer-motion';

interface IProps {
  title: string;
  initial: number;
  top?: string;
}

const AnimationHeroOtherPages = ({ title, initial, top = '51px' }: IProps) => {
  return (
    <motion.div
      initial={{ x: initial }}
      whileInView={{ x: 0 }}
      transition={{ delay: 1, type: 'spring' }}
      className={styles.title}
      style={{ top: top }}
    >
      {title}
    </motion.div>
  );
};
export default AnimationHeroOtherPages;
