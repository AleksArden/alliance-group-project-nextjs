// import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import Editor from 'ckeditor5-custom-build';

const editorConfiguration = {
  toolbar: [
    'heading',
    '|',
    'bold',
    'italic',
    'link',
    'bulletedList',
    'numberedList',
    '|',
    'outdent',
    'indent',
    '|',
    'imageUpload',
    'blockQuote',
    'insertTable',
    'mediaEmbed',
    'undo',
    'redo',
  ],
};

interface IProps {
  content: string;
  handleChangeContent: (event: string | unknown, editor: any) => void;
}

const MyEditor = (props: IProps) => {
  return (
    <CKEditor
      editor={Editor}
      config={editorConfiguration}
      data={props.content}
      onChange={props.handleChangeContent}
    />
  );
};

export default MyEditor;
