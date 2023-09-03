'use client';

import styles from './AnimationHero.module.scss';
import { motion, useScroll } from 'framer-motion';

const AnimationHero = () => {
  const { scrollYProgress } = useScroll();
  return (
    <>
      <motion.div
        initial={{ x: -1820 }}
        whileInView={{ x: 0 }}
        transition={{ delay: 1, type: 'spring' }}
        className={styles.companyName}
      >
        ALLIANCE
      </motion.div>
      <motion.div
        initial={{ x: 1320 }}
        whileInView={{ x: 0 }}
        transition={{ delay: 1, type: 'spring' }}
        className={styles.secondCompanyName}
      >
        Group LLC™
      </motion.div>
    </>
  );
};
export default AnimationHero;
