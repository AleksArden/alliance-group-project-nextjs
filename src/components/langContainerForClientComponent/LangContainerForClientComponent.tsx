import { getMessages } from 'lib/getMessage';
import { IntlProvider } from 'react-intl';

type IProps = {
  locale: string;
  children: React.ReactNode;
};

const LangContainerForClientComponent = async ({
  locale,
  children,
}: IProps) => {
  const messages = await getMessages(locale);

  return (
    <IntlProvider locale={locale} messages={messages}>
      <div>{children}</div>
    </IntlProvider>
  );
};

export default LangContainerForClientComponent;
