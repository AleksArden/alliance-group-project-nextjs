'use client';

import styles from './ContactsEmailForm.module.scss';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const schema = yup
  .object({
    name: yup
      .string()
      .min(2, 'Too Short!')
      .max(40, 'Too Long!')
      .required('Name is Requred'),

    email: yup
      .string()
      .email('Invalid phone number')
      .min(3, 'Too Short!')
      .required('Email is Requred'),
    text: yup.string().min(3, 'Too Short!').max(150, 'Too Long!'),
    phoneNumber: yup
      .string()
      .required('Phone number is required')
      .matches(phoneRegExp, 'Invalid phone number'),
  })
  .required();
type FormData = yup.InferType<typeof schema>;

const ContactsEmailForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  console.log(errors);
  const onSubmit = (data: FormData) => console.log(data);
  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={styles.title}>Напишіть нам</h2>
      <div className={styles.wrapperInput}>
        <input
          placeholder="Ваше Ім’я*"
          className={errors.name ? styles.inputError : styles.input}
          {...register('name')}
        />
        <div
          className={errors.name ? styles.inputIconError : styles.inputIcon}
        ></div>
        <p className={styles.error}>{errors.name?.message}</p>
      </div>

      <div className={styles.wrapperInput}>
        <input
          placeholder="Ваш Телефон*"
          className={errors.name ? styles.inputError : styles.input}
          {...register('phoneNumber')}
        />
        <div
          className={errors.name ? styles.inputIconError : styles.inputIcon}
        ></div>
        <p className={styles.error}>{errors.phoneNumber?.message}</p>
      </div>

      <div className={styles.wrapperInput}>
        <input
          placeholder="Ваш E-mail*"
          className={errors.name ? styles.inputError : styles.input}
          {...register('email')}
        />
        <div
          className={errors.name ? styles.inputIconError : styles.inputIcon}
        ></div>
        <p className={styles.error}>{errors.email?.message}</p>
      </div>

      <div className={styles.wrapperInput}>
        <textarea
          rows={3}
          placeholder="Ваше Повідомлення"
          className={styles.textarea}
          {...register('text')}
        />
        <div className={styles.inputIcon}></div>
        <p className={styles.error}>{errors.text?.message}</p>
      </div>
      <div className={styles.wrapperBtn}>
        <input className={styles.formBtn} type="submit" />
      </div>
    </form>
  );
};
export default ContactsEmailForm;
