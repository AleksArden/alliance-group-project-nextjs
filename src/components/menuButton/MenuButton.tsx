import styles from './MenuButton.module.scss';

import { getIntl } from 'lib/intl';

const MenuButton = async ({ locale }: { locale: string }) => {
  const intl = await getIntl(locale);
  return (
    <div className={styles.wrapperBtn}>
      <button className={styles.btn} type="button">
        {intl.formatMessage({ id: 'header.menuBtn' })}
        <div className={styles.menuIcon}></div>
      </button>
    </div>
  );
};
export default MenuButton;
