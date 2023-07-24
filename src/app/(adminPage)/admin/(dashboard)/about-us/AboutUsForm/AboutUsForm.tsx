'use client';
import { useEffect, useState } from 'react';
import styles from './AboutUsForm.module.scss';
import { addDataToFirestore } from '@/firebase/addData';
import { AboutUsType } from 'types/dataTypeForFirebase';
import Image from 'next/image';
import poster from 'public/posters/poster-not-found.jpg';
import { uploadPhotoToStorage } from '@/firebase/uploadPhotoToStorage';
import { SunEditor } from 'components/SunEditor/SunEditor';
import { buttonList } from 'suneditor-react';
// import Tiptap from 'components/Tiptap/Tiptap';

interface IProps {
  data: AboutUsType | undefined;
}
const AboutUsForm = ({ data }: IProps) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageURL, setImageURL] = useState('');
  console.log('title', title);
  console.log('content', content);
  console.log('URL', imageURL);

  const handleChangePreview = async (
    evt: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (evt.target.files !== null) {
      const file = evt.target.files[0];
      const imageURL = await uploadPhotoToStorage('about-us', 'photo', file);
      setImageURL(imageURL);
    }
  };
  useEffect(() => {
    console.log('useEffect', data);
    if (data?.title) setTitle(data?.title);
    if (data?.content && data?.content !== '') setContent(data?.content);
    if (data?.imageURL) setImageURL(data?.imageURL);
  }, [data, data?.content, data?.imageURL, data?.title]);

  const handleChangeContent = (content: string) => {
    setContent(content);
  };

  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const data: AboutUsType = {
      title,
      content,
      imageURL,
    };
    console.log('aboutForm', data);
    await addDataToFirestore('content', 'about-us', data);
  };

  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <label className={styles.label}>
        Title
        <input
          className={styles.input}
          type="text"
          name="title"
          minLength={3}
          maxLength={255}
          value={title}
          onChange={evt => setTitle(evt.target.value)}
        />
      </label>
      <label className={styles.label}>
        Description
        <SunEditor
          setContents={content}
          onChange={handleChangeContent}
          setAllPlugins={true}
          setOptions={{
            toolbarContainer: '#toolbar_container',
            showPathLabel: false,
            charCounter: true,
            maxCharCount: 720,

            width: '600px',
            height: 'auto',
            minHeight: '100%',

            buttonList: [
              // default
              ['undo', 'redo'],
              [
                ':p-More Paragraph-default.more_paragraph',
                'font',
                'fontSize',
                'formatBlock',
                'paragraphStyle',
                'blockquote',
              ],
              [
                'bold',
                'underline',
                'italic',
                'strike',
                // 'subscript',
                // 'superscript',
              ],
              // ['fontColor', 'hiliteColor', 'textStyle'],
              ['removeFormat'],
              ['outdent', 'indent'],
              ['align', 'horizontalRule', 'list', 'lineHeight'],
            ],
          }}
        />
        {/* <Tiptap setContent={setContent} content={content} /> */}
        <textarea
          className={styles.textarea}
          name="text"
          value={content}
          onChange={evt => setContent(evt.target.value)}
        ></textarea>
      </label>
      <label className={styles.label}>
        Image
        <input
          className={styles.input}
          type="file"
          name="file"
          accept=".jpg, .jpeg, .png"
          onChange={handleChangePreview}
        />
        <Image
          src={imageURL ? imageURL : poster}
          width={150}
          height={150}
          alt="The photo download"
        />
      </label>
      <button className={styles.button} type="submit">
        Save
      </button>
    </form>
  );
};
export default AboutUsForm;
