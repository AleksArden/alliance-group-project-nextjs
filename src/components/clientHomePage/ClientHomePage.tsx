'use client';

import styles from './ClientHomePage.module.scss';
import { IntroType } from 'types/dataTypeForFirebase';
import BackgroundImage from 'components/backgroundImage/BackgroundImage';
import AnimationIntro from 'components/animationIntro/AnimationIntro';

interface IProps {
  dataIntro: IntroType | undefined;
}

const ClientHomePage = ({ dataIntro }: IProps) => {
  return (
    <section className={styles.intro}>
      {dataIntro && (
        <>
          <BackgroundImage imageUrl={dataIntro.backgroundImageDesktop} />
          <AnimationIntro text={dataIntro.text} sign={dataIntro.sign} />
        </>
      )}
    </section>
  );
};
export default ClientHomePage;
