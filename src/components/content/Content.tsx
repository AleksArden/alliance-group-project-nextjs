'use client';
import { useEffect, useState } from 'react';
import styles from './Content.module.scss';
type Props = {
  content: string;
};
const Content = ({ content }: Props) => {
  const [html, setHtml] = useState('');
  useEffect(() => {
    setHtml(content);
  }, [content]);
  return (
    <div
      className={styles.wrapper}
      dangerouslySetInnerHTML={{ __html: html }}
    ></div>
  );
};
export default Content;
