import dynamic from 'next/dynamic';
import 'suneditor/dist/css/suneditor.min.css';
export const SunEditor = dynamic(() => import('suneditor-react'), {
  ssr: false,
});
