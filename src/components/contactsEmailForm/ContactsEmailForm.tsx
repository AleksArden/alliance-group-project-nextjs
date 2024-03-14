'use client';

import styles from './ContactsEmailForm.module.scss';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import MainButton from 'components/mainButton/mainButton';
import { Lang } from 'types/otherType';
import { useIsWideScreen } from 'hooks/useIsWideScreen';

import { submitContactsEmailForm } from 'app/api/actions';
import Loading from 'app/[locale]/(marketing)/loading';
import {
  ContactsEmailForm,
  TranslationsContactsEmailForm,
} from 'lang/translations';

const ContactsEmailForm = ({ locale }: { locale: string }) => {
  const [isEventBlurName, setIsEventBlurName] = useState<boolean>(false);
  const [isEventBlurPhone, setIsEventBlurPhone] = useState<boolean>(false);
  const [isEventBlurEmail, setIsEventBlurEmail] = useState<boolean>(false);
  const [isEventBlurText, setIsEventBlurText] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState(false);

  const [isDesktopScreen] = useIsWideScreen();

  const [translation, setTranslation] = useState<ContactsEmailForm>();

  const [isModal, setIsModal] = useState(false);

  const schema = Yup.object()
    .shape({
      name: Yup.string()
        .required(translation?.nameError.required)
        .min(2, translation?.nameError.min)
        .max(40, translation?.nameError.max),

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

  useEffect(() => {
    switch (locale) {
      case Lang.UK:
        setTranslation(TranslationsContactsEmailForm.uk);
        break;
      case Lang.EN:
        setTranslation(TranslationsContactsEmailForm.en);
        break;
      default:
        setTranslation(TranslationsContactsEmailForm.tr);
        break;
    }
  }, [locale]);

  const {
    register,
    handleSubmit,
    reset,
    formState,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: 'all',
    criteriaMode: 'firstError',
    defaultValues: { name: '', phoneNumber: '', email: '', text: '' },
  });

  const onSubmit = async (data: FormData) => {
    console.log(data);
    setIsLoading(true);
    await submitContactsEmailForm(data);

    setIsLoading(false);
  };
  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({ name: '', phoneNumber: '', email: '', text: '' });
      setIsEventBlurName(false);
      setIsEventBlurPhone(false);
      setIsEventBlurEmail(false);
      setIsEventBlurText(false);
      setIsModal(true);
      setTimeout(() => {
        setIsModal(false);
      }, 10000);
    }
    if (formState.isSubmitted && formState.errors.name) {
      setIsEventBlurName(true);
    }
    if (formState.isSubmitted && formState.errors.phoneNumber) {
      setIsEventBlurPhone(true);
    }
    if (formState.isSubmitted && formState.errors.email) {
      setIsEventBlurEmail(true);
    }
    if (formState.isSubmitted && formState.errors.text) {
      setIsEventBlurText(true);
    }
  }, [formState, reset]);

  return (
    <>
      {isLoading && <Loading />}
      <form
        className={styles.form}
        onSubmit={handleSubmit(onSubmit)}
        id="form-id"
      >
        <div className={isModal ? styles.showModal : styles.modal}>
          <p className={styles.text}>{translation?.message}</p>
        </div>

        <h2 className={styles.title}>{translation?.title}</h2>
        <div className={styles.wrapperInput}>
          <input
            placeholder={translation?.name}
            className={errors.name ? styles.inputError : styles.input}
            {...register('name', {
              onChange: () => {
                setIsEventBlurName(true);
              },
              onBlur: () => {
                setIsEventBlurName(true);
              },
            })}
          />
          {!isEventBlurName ? (
            <div className={styles.inputIcon}></div>
          ) : (
            <div
              className={
                errors.name ? styles.inputIconError : styles.inputIconOk
              }
            ></div>
          )}

          <p className={errors.name && styles.error}>{errors.name?.message}</p>
        </div>

        <div className={styles.wrapperInput}>
          <input
            placeholder={translation?.phoneNumber}
            className={errors.phoneNumber ? styles.inputError : styles.input}
            {...register('phoneNumber', {
              onChange: () => {
                setIsEventBlurPhone(true);
              },
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
            placeholder={translation?.mail}
            className={errors.email ? styles.inputError : styles.input}
            {...register('email', {
              onChange: () => {
                setIsEventBlurEmail(true);
              },
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
          <p className={errors.email && styles.error}>
            {errors.email?.message}
          </p>
        </div>

        <div className={styles.wrapperTextarea}>
          <textarea
            rows={3}
            placeholder={translation?.text}
            className={errors.text ? styles.textareaError : styles.textarea}
            {...register('text', {
              onChange: () => {
                setIsEventBlurText(true);
              },
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
          <p className={errors.text && styles.textareaerror}>
            {errors.text?.message}
          </p>
        </div>

        <MainButton
          name={translation?.button}
          styleWrapperBtn={
            isDesktopScreen
              ? {
                  width: 243,
                  borderColor: '#5f391880',
                  marginLeft: 'auto',
                }
              : {
                  width: 176,
                  height: 62,
                  borderRadius: '32px 0 59px 32px',
                  borderColor: '#5f391880',
                  marginLeft: 'auto',
                }
          }
          styleBtn={
            isDesktopScreen
              ? { width: 233 }
              : {
                  width: 166,
                  height: 54,
                  borderRadius: '27px 0 54px 27px',
                }
          }
          type="submit"
        />
      </form>
    </>
  );
};
export default ContactsEmailForm;
