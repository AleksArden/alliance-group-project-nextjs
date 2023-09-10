'use client';

import styles from './ContactsEmailForm.module.scss';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useState } from 'react';

const schema = Yup.object()
  .shape({
    name: Yup.string()
      .required('Name is Requred')
      .min(2, 'Too Short!')
      .max(40, 'Too Long!'),

    email: Yup.string().required('Email is Requred').email('Invalid Email'),
    text: Yup.string()
      .required('Text is Requred')
      .min(3, 'Too Short!')
      .max(150, 'Too Long!'),
    phoneNumber: Yup.string()
      .required('Phone Number is Requred')
      .matches(
        new RegExp('[0-9]{12}'),
        'The phone number must contain 12 digits'
      ),
  })
  .required();
type FormData = Yup.InferType<typeof schema>;

const ContactsEmailForm = () => {
  const [isEventBlurName, setIsEventBlurName] = useState<boolean>(false);
  const [isEventBlurPhone, setIsEventBlurPhone] = useState<boolean>(false);
  const [isEventBlurEmail, setIsEventBlurEmail] = useState<boolean>(false);
  const [isEventBlurText, setIsEventBlurText] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: 'onTouched',
    criteriaMode: 'firstError',
  });

  console.log('isEventBlurName', isEventBlurName);

  const onSubmit = (data: FormData) => console.log(data);
  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={styles.title}>Напишіть нам</h2>
      <div className={styles.wrapperInput}>
        <input
          placeholder="Ваше Ім’я*"
          className={errors.name ? styles.inputError : styles.input}
          {...register('name', {
            onBlur: () => setIsEventBlurName(true),
          })}
        />
        {!isEventBlurName ? (
          <div className={styles.inputIcon}></div>
        ) : (
          <div
            className={errors.name ? styles.inputIconError : styles.inputIconOk}
          ></div>
        )}
        <p className={styles.error}>{errors.name?.message}</p>
      </div>

      <div className={styles.wrapperInput}>
        <input
          placeholder="Ваш Телефон*"
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
        <p className={styles.error}>{errors.phoneNumber?.message}</p>
      </div>

      <div className={styles.wrapperInput}>
        <input
          placeholder="Ваш E-mail*"
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
        <p className={styles.error}>{errors.email?.message}</p>
      </div>

      <div className={styles.wrapperInput}>
        <textarea
          rows={3}
          placeholder="Ваше Повідомлення"
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
        <p className={styles.error}>{errors.text?.message}</p>
      </div>
      <div className={styles.wrapperBtn}>
        <button className={styles.formBtn} type="submit" />
      </div>
    </form>
  );
};
export default ContactsEmailForm;
