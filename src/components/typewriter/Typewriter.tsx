'use client';

import { useEffect, useState } from 'react';
import styles from './Typewriter.module.scss';

interface IProps {
  text: string;
  speed: number;
}

const Typewriter = ({ text, speed }: IProps) => {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    let i = -1;
    const typingInterval = setInterval(() => {
      if (i < text.length) {
        i++;
        setDisplayText(prevText => prevText + text.charAt(i));
      } else {
        clearInterval(typingInterval);
      }
    }, speed);
    // const typingInterval = setInterval(() => {
    //   for (let i = 0; i < text.length; i++) {
    //     if (i < text.length) {
    //       setDisplayText(prevText => prevText + text.charAt(i));
    //     } else {
    //       clearInterval(typingInterval);
    //     }
    //   }
    // }, speed);

    return () => {
      clearInterval(typingInterval);
    };
  }, [speed, text]);
  return <p className={styles.text}>{displayText}</p>;
};
export default Typewriter;
