import { CKEditor } from '@ckeditor/ckeditor5-react';
import Editor from 'ckeditor5-custom-build';

interface IProps {
  content: string;
  handleChangeContent: (event: string | unknown, editor: typeof Editor) => void;
}

const MyEditor = (props: IProps) => {
  return (
    <CKEditor
      editor={Editor}
      data={props.content}
      onChange={props.handleChangeContent}
    />
  );
};

export default MyEditor;
