// import React, { useState } from 'react';
// import styles from "./DropDownProfile.module.css"
// import MyProfileModal from '../myProfileModal/MyProfileModal.tsx';
// import InviteFriendsModal from '../InviteFriendsModal/InvitefrndsModal.tsx';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';


// const Menus = ['My Account', 'Invite Friends' , 'Sign Out'];

// function DropDownProfile(){
//   const [isModalOpen, setModalOpen] = useState(false);
//   const [isInviteFriendsModalOpen, setInviteFriendsModalOpen] = useState(false);
//   const [isDropdownVisible, setDropdownVisible] = useState(true);
//   const navigate = useNavigate(); 
  

//   const handleMyAccountClick = () => {
//     setModalOpen(!isModalOpen);
//     setDropdownVisible(false);
// };

// const handleInviteFriendsClick = () => {
//   setInviteFriendsModalOpen(!isInviteFriendsModalOpen);
//   setDropdownVisible(false);
// };

// const logout = async () => {
//   try {
//     const response = await axios.get('/api/user/signout');
//     console.log(response.data);
//     if(response.data.status === 200){
//       navigate('/');
//     }else{
//       navigate('/');
//     }
//   } catch (error: any) {
//     console.error('Error while logout:', error.message);
//   }
// };

// const handleMenuClick = (menu: string) => {
//   switch (menu) {
//     case 'My Account':
//       handleMyAccountClick();
//       break;
//     case 'Sign Out':
//       logout();
//       break;
//     case 'Invite Friends':
//       handleInviteFriendsClick();
//       // Handle Invite Friends logic (e.g., navigate to the invite page)
//       break;

//     default:
//       break;
//   }
// };

//   return(
//         <>
//         {isDropdownVisible && (
//         <div 
//           className={styles.DropDownMenu}>
//             <ul>
//               <div className={styles.div}>
//                 {
//                 Menus.map((menu)=>(
//                 <li 
//                 className={styles.dropDown} 
//                 key={menu}
//                 onClick={() => handleMenuClick(menu)}
//                 >
//                   {menu}</li>
//                   ))}
//                 </div>
//             </ul>
//          </div>
//         )}

//          {isModalOpen && (
//         // Add your modal component here or implement modal logic
//         <div>
//           <MyProfileModal closeModal={setModalOpen}/>;
//         </div>
//       )}
//        {isInviteFriendsModalOpen && (
//         <div>
//           {/* Replace 'InviteFriendsModal' with the actual name of your Invite Friends modal component */}
//           <InviteFriendsModal closeModal={() => setInviteFriendsModalOpen(false)} />;
//         </div>
//        )}
        
//         </>
//     );
// }
// export default DropDownProfile;

/////////////////////////////// documentation



// Import necessary dependencies and components from external files and libraries
import React, { useState } from 'react';
import styles from "./DropDownProfile.module.css"
import MyProfileModal from '../myProfileModal/MyProfileModal.tsx';
import InviteFriendsModal from '../InviteFriendsModal/InvitefrndsModal.tsx';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Define the menu items for the dropdown
const Menus = ['My Account', 'Invite Friends' , 'Sign Out'];

// Functional component for the dropdown profile
function DropDownProfile(){
  // State variables to manage the modal and dropdown visibility
  const [isModalOpen, setModalOpen] = useState(false);
  const [isInviteFriendsModalOpen, setInviteFriendsModalOpen] = useState(false);
  const [isDropdownVisible, setDropdownVisible] = useState(true);
  const navigate = useNavigate(); // React Router hook for navigation
  
  // Handler for 'My Account' click, toggles the profile modal and hides the dropdown
  const handleMyAccountClick = () => {
    setModalOpen(!isModalOpen);
    setDropdownVisible(false);
  };

  // Handler for 'Invite Friends' click, toggles the invite friends modal and hides the dropdown
  const handleInviteFriendsClick = () => {
    setInviteFriendsModalOpen(!isInviteFriendsModalOpen);
    setDropdownVisible(false);
  };

  // Async function for handling user logout
  const logout = async () => {
    try {
      // Make a request to the server to sign the user out
      const response = await axios.get('/api/user/signout');
      console.log(response.data);
      
      // Check the status of the response and navigate accordingly
      if(response.data.status === 200){
        navigate('/');
      }else{
        navigate('/');
      }
    } catch (error: any) {
      // Log an error message if there is an issue with the logout process
      console.error('Error while logout:', error.message);
    }
  };

  // Handler for menu item click, performs actions based on the clicked menu
  const handleMenuClick = (menu: string) => {
    switch (menu) {
      case 'My Account':
        handleMyAccountClick();
        break;
      case 'Sign Out':
        logout();
        break;
      case 'Invite Friends':
        handleInviteFriendsClick();
        // Handle Invite Friends logic (e.g., navigate to the invite page)
        break;
      default:
        break;
    }
  };

  // JSX rendering of the dropdown and modals
  return(
    <>
      {/* Render the dropdown only if it is visible */}
      {isDropdownVisible && (
        <div className={styles.DropDownMenu}>
          <ul>
            <div className={styles.div}>
              {
                // Map through menu items and render list items with click handlers
                Menus.map((menu)=>(
                  <li 
                    className={styles.dropDown} 
                    key={menu}
                    onClick={() => handleMenuClick(menu)}
                  >
                    {menu}
                  </li>
                ))}
            </div>
          </ul>
        </div>
      )}

      {/* Render the profile modal if it is open */}
      {isModalOpen && (
        <div>
          {/* Pass a function to close the modal as a prop */}
          <MyProfileModal closeModal={() => setModalOpen(false)} />;
        </div>
      )}

      {/* Render the invite friends modal if it is open */}
      {isInviteFriendsModalOpen && (
        <div>
          {/* Pass a function to close the modal as a prop */}
          <InviteFriendsModal closeModal={() => setInviteFriendsModalOpen(false)} />;
        </div>
      )}
    </>
  );
}

// Export the component as the default export
export default DropDownProfile;
