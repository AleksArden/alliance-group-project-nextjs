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
        fontSize: [14, 18, 24, 36, 96],
        width: '600px',
        height: 'auto',
        minHeight: '100%',

        buttonList: [
          [
            'undo',
            'redo',
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
