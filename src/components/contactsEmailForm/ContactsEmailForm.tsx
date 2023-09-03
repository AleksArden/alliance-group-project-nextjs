'use client';

import styles from './ContactsEmailForm.module.scss';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const schema = yup
  .object({
    name: yup.string().required('Name Requred'),

    email: yup
      .string()
      .required('Email Requred')
      .email('тут повинен бути email'),
    text: yup.string().required('Повідомлення Requred'),
    phoneNumber: yup
      .string()
      .required('Number Phone Must be')
      .matches(phoneRegExp, 'Phone number is not valid'),
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
  const onSubmit = (data: FormData) => console.log(data);
  return (
    <form
      style={{ marginLeft: 50, marginTop: 50 }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        placeholder="Ваше Ім’я*"
        className={styles.input}
        {...register('name')}
      />
      <p>{errors.name?.message}</p>

      <input
        placeholder="Ваш Телефон*"
        className={styles.input}
        {...register('phoneNumber')}
      />
      <p>{errors.phoneNumber?.message}</p>

      <input
        placeholder="Ваш E-mail*"
        className={styles.input}
        {...register('email')}
      />
      <p>{errors.email?.message}</p>

      <textarea
        rows={3}
        placeholder="Ваше Повідомлення"
        className={styles.textarea}
        {...register('text')}
      />
      <p>{errors.text?.message}</p>
      <input type="submit" />
    </form>
  );
};
export default ContactsEmailForm;
