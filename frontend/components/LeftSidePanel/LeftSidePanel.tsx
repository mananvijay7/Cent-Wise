import React, { useState } from 'react';
import styles from "./LeftSidePanel.module.css";
import {LeftSidePanelData} from "./LeftSidePanelData";
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface LeftSidePanelItem {
  titleKey: string;
  icon: React.ReactNode;
  link: string;
}

function LeftSidePanel() {
  const { t } = useTranslation('common');
    const [focusedItem, setFocusedItem] = useState<number | null>(null);
    const [currPage, setCurrPage] = useState<string | null>("/");
    const handleItemClick = (index: number) => {
      setFocusedItem(index);
    };

    return (
      <>
        <div className={styles.LeftPanel}>
          <div className={styles.Montserrat}></div>
          <ul className={styles.LeftSideBarList}>

          {LeftSidePanelData.map((val, index) => {
            // Declare the 'item' variable here
            const item: LeftSidePanelItem = {
              icon: val.icon,
              titleKey: val.titleKey,
              link: val.link,
            };

              return (
                <li
                  key={index}
                  className={`${styles.row} ${focusedItem === index ? styles.focused : ''}`}
                  onClick={() => handleItemClick(index)}  >
                  <Link className={styles.link}  to={val. link}>
                    {""}
                    <div className={styles.mainDiv}>
                    <div className={styles.icon}>{val.icon}
                    {""}</div>
                    <div>{t(item.titleKey)}</div>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </>
    );
  }
  export default LeftSidePanel;
  
