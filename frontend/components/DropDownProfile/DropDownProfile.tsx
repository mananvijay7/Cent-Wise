import React, { useState } from 'react';
import styles from "./DropDownProfile.module.css"
import MyProfileModal from '../myProfileModal/MyProfileModal.tsx';
import InviteFriendsModal from '../InviteFriendsModal/InvitefrndsModal.tsx';


const Menus = ['My Account', 'Invite Friends' , 'Sign Out'];

function DropDownProfile(){
  const [isModalOpen, setModalOpen] = useState(false);
  const [isInviteFriendsModalOpen, setInviteFriendsModalOpen] = useState(false);
  const [isDropdownVisible, setDropdownVisible] = useState(true);
  

  const handleMyAccountClick = () => {
    setModalOpen(!isModalOpen);
    setDropdownVisible(false);
};

const handleInviteFriendsClick = () => {
  setInviteFriendsModalOpen(!isInviteFriendsModalOpen);
  setDropdownVisible(false);
};

const handleMenuClick = (menu: string) => {
  switch (menu) {
    case 'My Account':
      handleMyAccountClick();
      break;
    case 'Sign Out':
      // Handle Sign Out logic (e.g., log out the user)
      break;
    case 'Invite Friends':
      handleInviteFriendsClick();
      // Handle Invite Friends logic (e.g., navigate to the invite page)
      break;
    // Add more cases for other menu items
    default:
      break;
  }
};

  return(
        <>
        {isDropdownVisible && (
        <div 
          className={styles.DropDownMenu}>
            <ul>
              <div className={styles.div}>
                {
                Menus.map((menu)=>(
                <li 
                className={styles.dropDown} 
                key={menu}
                onClick={() => handleMenuClick(menu)}
                >
                  {menu}</li>
                  ))}
                </div>
            </ul>
         </div>
        )}

         {isModalOpen && (
        // Add your modal component here or implement modal logic
        <div>
          <MyProfileModal closeModal={setModalOpen}/>;
        </div>
      )}
       {isInviteFriendsModalOpen && (
        <div>
          {/* Replace 'InviteFriendsModal' with the actual name of your Invite Friends modal component */}
          <InviteFriendsModal closeModal={() => setInviteFriendsModalOpen(false)} />;
        </div>
       )}
        
        </>
    );
}
export default DropDownProfile;