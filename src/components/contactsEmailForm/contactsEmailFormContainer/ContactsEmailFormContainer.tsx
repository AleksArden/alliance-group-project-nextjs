import { getMessages } from 'helpers/functions';
import { IntlProvider } from 'react-intl';

interface IProps {
  locale: string;
  children: React.ReactNode;
}

const ContactsEmailFormContainer = async ({ locale, children }: IProps) => {
  const messages = await getMessages(locale);

  return (
    <IntlProvider locale={locale} messages={messages}>
      <div>{children}</div>
    </IntlProvider>
  );
};

export default ContactsEmailFormContainer;
