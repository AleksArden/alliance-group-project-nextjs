'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import MenuBar from './TipTapMenuBar';
import styles from './TipTap.module.scss';
import { useEffect, useState } from 'react';
// import { content } from './dataTipTap';
interface IProps {
  content: string;
}

const TiptapContent = ({ content }: IProps) => {
  const editor = useEditor({
    extensions: [StarterKit],

    editorProps: {
      attributes: {
        spellcheck: 'false',
      },
    },
  });

  useEffect(() => {
    if (!editor) {
      return undefined;
    }

    editor.commands.setContent(content);
  }, [content, editor]);

  return <EditorContent editor={editor} />;
};

export default TiptapContent;
