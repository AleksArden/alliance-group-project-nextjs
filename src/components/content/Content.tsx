'use client';
import { useEffect, useState } from 'react';

type Props = {
  content: string;
};
const Content = ({ content }: Props) => {
  const [html, setHtml] = useState('');
  useEffect(() => {
    setHtml(content);
  }, [content]);
  return <div dangerouslySetInnerHTML={{ __html: html }}></div>;
};
export default Content;
