import styles from "./AddAnExpenseButton.module.css";
import { useTranslation } from 'react-i18next';


function addAnExpenseButton() {
 
  const { t } = useTranslation('common');
  return <button className={styles.addExpenseBtn}>{t('add.expense.button.label')}</button>;
}

export default addAnExpenseButton;
