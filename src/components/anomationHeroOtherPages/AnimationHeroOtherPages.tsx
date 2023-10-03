'use client';

import styles from './AnimationHeroOtherPages.module.scss';
import { motion } from 'framer-motion';

interface IProps {
  title: string;
  initial: number;
}

const AnimationHeroOtherPages = ({ title, initial }: IProps) => {
  return (
    <motion.div
      initial={{ x: initial }}
      whileInView={{ x: 0 }}
      transition={{ delay: 1, type: 'spring' }}
      className={styles.title}
    >
      {title}
    </motion.div>
  );
};
export default AnimationHeroOtherPages;
