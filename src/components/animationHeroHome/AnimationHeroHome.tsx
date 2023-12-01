'use client';

import { arrayCompanyName } from 'helpers/functions';
import styles from './AnimationHeroHome.module.scss';
import { motion } from 'framer-motion';

interface IProps {
  title: string;
}

const AnimationHeroHome = ({ title }: IProps) => {
  return (
    <>
      <motion.div
        initial={{ x: -1820 }}
        whileInView={{ x: 0 }}
        transition={{ delay: 1, type: 'spring' }}
        className={styles.firstPartCompanyName}
      >
        {arrayCompanyName(title)[0]}
      </motion.div>
      <motion.div
        initial={{ x: 1430 }}
        whileInView={{ x: 0 }}
        transition={{ delay: 1, type: 'spring' }}
        className={styles.secondPartCompanyName}
      >
        {arrayCompanyName(title)[1]}
      </motion.div>
    </>
  );
};
export default AnimationHeroHome;
