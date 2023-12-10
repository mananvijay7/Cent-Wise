import React, { useState, useEffect } from 'react';
import styles from "./Navbar.module.css";
import AddanExpenseButton from "../Buttons/AddanExpenseButton";
import SettleUpButton from "../Buttons/SettleUpButton";
import DropDownProfile from '../DropDownProfile/DropDownProfile';
import userData from "./navbarUserData.json";
import { useTranslation } from 'react-i18next';
import centwiseLogoPath from "../../../public/images/CentwiseLogo.png";

function Navbar() {


  const { t } = useTranslation('common');
  const [user, setUser] = useState({
    username: '',
    profilePicture: ''
  });
  const [dropdownVisible, setDropdownVisible] = useState(false);

  useEffect(() => {
    // Fetch user data when the component mounts
    setUser(userData);
  }, []);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    
    <>

      <nav className={styles.nav}>
        <a href="index.html">
          <img className={styles.centwiseLogo} src={centwiseLogoPath} ></img>
        </a>
        <div className={styles.navContainer}>
          <ul className={styles.navbar}>
            <li>
              <div className={styles.buttons}>
                <a href="index.html">
                  <AddanExpenseButton />
                </a>
                <a href="index.html"><SettleUpButton /></a>
              </div>
              <p className={styles.verticalLine}>  </p>
              <div className={styles.userContainer}>
                <img className={styles.userProfile} src={user.profilePicture} alt="User Profile img" onClick={toggleDropdown} />
                <p className={styles.userName} onClick={toggleDropdown}>
                  {user.username}</p>
                {/* </div> */}
                {dropdownVisible && (
                  <div className={styles.dropdownMenu}>
                    <DropDownProfile />
                  </div>
                )}
              </div>
            </li>
          </ul>
        </div>
      </nav>

    </>
  );
}
export default Navbar;
