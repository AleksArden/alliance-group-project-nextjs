import dynamic from 'next/dynamic';
import 'suneditor/dist/css/suneditor.min.css';

const SunEditor = dynamic(() => import('suneditor-react'), {
  ssr: false,
});

interface IProps {
  content: string;
  handleChangeContent: (content: string) => void;
}

const SunEditorComponent = ({ content, handleChangeContent }: IProps) => {
  return (
    <SunEditor
      setContents={content}
      onChange={handleChangeContent}
      setAllPlugins={true}
      setOptions={{
        toolbarContainer: '#toolbar_container',
        showPathLabel: false,
        font: ['Roboto', 'Calibri', 'Arial'],
        fontSize: [14, 18, 24, 30],
        width: '600px',
        height: 'auto',
        minHeight: '100%',

        buttonList: [
          [
            'undo',
            'redo',
            'font',
            'fontSize',
            'formatBlock',
            'blockquote',
            'bold',
            'underline',
            'italic',
            'strike',
            'removeFormat',
            'outdent',
            'indent',
            'align',
            'horizontalRule',
            'list',
            'lineHeight',
          ],
        ],
      }}
    />
  );
};
export default SunEditorComponent;
