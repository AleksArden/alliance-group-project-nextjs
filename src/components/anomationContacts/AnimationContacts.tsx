'use client';

import styles from './AnomationContacts.module.scss';
import { motion } from 'framer-motion';

interface IProps {
  title: string;
}

const AnimationContacts = ({ title }: IProps) => {
  return (
    <motion.div
      initial={{ x: -1520 }}
      whileInView={{ x: 0 }}
      transition={{ delay: 1, type: 'spring' }}
      className={styles.title}
    >
      {title}
    </motion.div>
  );
};
export default AnimationContacts;
