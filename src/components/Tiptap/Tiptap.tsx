'use client';

import './styles.scss';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import MenuBar from './TipTapMenuBar';
import styles from './TipTap.module.scss';
import { useEffect, useState } from 'react';

interface IProps {
  setContent: (text: string) => void;
  content: string;
}

const Tiptap = ({ setContent, content }: IProps) => {
  const [text, setText] = useState('');

  // console.log(content);
  const editor = useEditor({
    extensions: [StarterKit],

    editorProps: {
      attributes: {
        spellcheck: 'false',
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();

      setText(html);
    },
  });

  useEffect(() => {
    setContent(text);
  }, [setContent, text]);

  useEffect(() => {
    if (!editor) {
      return undefined;
    }

    editor.commands.setContent(content);
  }, [content, editor]);

  return (
    <>
      <div className={styles.wrapper}>
        <MenuBar editor={editor} />
      </div>
      <EditorContent editor={editor} />;
    </>
  );
};

export default Tiptap;
