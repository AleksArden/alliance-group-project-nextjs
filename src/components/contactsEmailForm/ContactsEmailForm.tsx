'use client';

import styles from './ContactsEmailForm.module.scss';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import MainButton from 'components/mainButton/mainButton';
import { Lang } from 'types/otherType';
import { useIsWideScreen } from 'hooks/useIsWideScreen';

const schema = Yup.object()
  .shape({
    name: Yup.string()
      .required('Name is Required')
      .min(2, 'Too Short!')
      .max(40, 'Too Long!'),

    email: Yup.string().required('Email is Required').email('Invalid Email'),
    text: Yup.string()
      .required('Text is Required')
      .min(3, 'Too Short!')
      .max(150, 'Too Long!'),
    phoneNumber: Yup.string()
      .required('Phone Number is Required')
      .matches(new RegExp('[0-9]{12}'), 'Number should be 12 digits long'),
  })
  .required();
type FormData = Yup.InferType<typeof schema>;

const ContactsEmailForm = ({ locale }: { locale: string }) => {
  const [isEventBlurName, setIsEventBlurName] = useState<boolean>(false);
  const [isEventBlurPhone, setIsEventBlurPhone] = useState<boolean>(false);
  const [isEventBlurEmail, setIsEventBlurEmail] = useState<boolean>(false);
  const [isEventBlurText, setIsEventBlurText] = useState<boolean>(false);

  const [isDesktopScreen, isTabletScreen, isMobileScreen] = useIsWideScreen();

  const [names, setNames] = useState<string[]>();

  useEffect(() => {
    switch (locale) {
      case Lang.UK:
        setNames([
          'Напишить нам',
          'Надіслати',
          `Ваше ім'я*`,
          'Ваш телефон*',
          'Ваш e-mail*',
          'Ваше повідомлення',
        ]);
        break;
      case Lang.EN:
        setNames([
          'Write to us',
          'Send',
          'Your name*',
          'Your phone*',
          'Your e-mail*',
          'Your message',
        ]);
        break;
      default:
        setNames([
          'Bize yazın',
          'Göndermek',
          'Adınız*',
          'Telefonunuz*',
          'E-posta adresiniz*',
          'Mesajın',
        ]);
        break;
    }
  }, [locale]);

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: 'onTouched',
    criteriaMode: 'firstError',
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit(onSubmit)}
      id="form-id"
    >
      <h2 className={styles.title}>{names && names[0]}</h2>
      <div className={styles.wrapperInput}>
        <input
          placeholder={names && names[2]}
          className={errors.name ? styles.inputError : styles.input}
          {...register('name', {
            onBlur: () => {
              setIsEventBlurName(true);
            },
          })}
        />
        {!isEventBlurName ? (
          <div className={styles.inputIcon}></div>
        ) : (
          <div
            className={errors.name ? styles.inputIconError : styles.inputIconOk}
          ></div>
        )}

        <p className={errors.name && styles.error}>{errors.name?.message}</p>
      </div>

      <div className={styles.wrapperInput}>
        <input
          placeholder={names && names[3]}
          className={errors.phoneNumber ? styles.inputError : styles.input}
          {...register('phoneNumber', {
            onBlur: () => setIsEventBlurPhone(true),
          })}
        />
        {!isEventBlurPhone ? (
          <div className={styles.inputIcon}></div>
        ) : (
          <div
            className={
              errors.phoneNumber ? styles.inputIconError : styles.inputIconOk
            }
          ></div>
        )}

        <p className={errors.phoneNumber && styles.error}>
          {errors.phoneNumber?.message}
        </p>
      </div>

      <div className={styles.wrapperInput}>
        <input
          placeholder={names && names[4]}
          className={errors.email ? styles.inputError : styles.input}
          {...register('email', {
            onBlur: () => setIsEventBlurEmail(true),
          })}
        />
        {!isEventBlurEmail ? (
          <div className={styles.inputIcon}></div>
        ) : (
          <div
            className={
              errors.email ? styles.inputIconError : styles.inputIconOk
            }
          ></div>
        )}
        <p className={errors.email && styles.error}>{errors.email?.message}</p>
      </div>

      <div className={styles.wrapperTextarea}>
        <textarea
          rows={3}
          placeholder={names && names[5]}
          className={errors.text ? styles.textareaError : styles.textarea}
          {...register('text', {
            onBlur: () => setIsEventBlurText(true),
          })}
        />
        {!isEventBlurText ? (
          <div className={styles.inputIcon}></div>
        ) : (
          <div
            className={
              errors.text ? styles.textareaIconError : styles.textareaIconOk
            }
          ></div>
        )}
        <p className={errors.text && styles.error}>{errors.text?.message}</p>
      </div>
      {isDesktopScreen && (
        <MainButton
          name={names && names[1]}
          styleWrapperBtn={{
            width: 243,
            borderColor: '#5f391880',
            marginLeft: 'auto',
          }}
          styleBtn={{ width: 235 }}
          type="submit"
        />
      )}
      {(isTabletScreen || isMobileScreen) && (
        <MainButton
          name={names && names[1]}
          styleWrapperBtn={{
            width: 176,
            height: 62,
            borderRadius: '32px 0 59px 32px',
            borderColor: '#5f391880',
            marginLeft: 'auto',
          }}
          styleBtn={{
            width: 168,
            height: 54,
            borderRadius: '27px 0 54px 27px',
          }}
          type="submit"
        />
      )}
    </form>
  );
};
export default ContactsEmailForm;
