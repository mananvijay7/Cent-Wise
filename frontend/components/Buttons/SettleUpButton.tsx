import styles from "./SettleUpButton.module.css";
import { useTranslation } from 'react-i18next';


function SettleUpButtonButton() 
{
const { t } = useTranslation('common');

  return <button className={styles.settleUpBtn}> {t('settle.up.button.label')} </button>;
}
export default SettleUpButtonButton;
