'use client';

import styles from './AnimationHero.module.scss';
import { motion } from 'framer-motion';

const AnimationHero = () => {
  return (
    <>
      <motion.div
        initial={{ x: -1920 }}
        whileInView={{ x: 0 }}
        transition={{ delay: 1, type: 'spring' }}
        className={styles.companyName}
      >
        ALLIANCE
      </motion.div>
      <motion.div
        initial={{ x: 1920 }}
        whileInView={{ x: 0 }}
        // transition={{ delay: 1 }}
        className={styles.secondCompanyName}
      >
        Group LLC™
      </motion.div>
    </>
  );
};
export default AnimationHero;
