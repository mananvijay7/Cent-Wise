// import React, {useState} from "react";
// import styles from "./InviteFriendsModal.module.css";

// function InviteFriendsModal({closeModal}){

//     const [email, setEmail] = useState<string>('');
//     const [isValidEmail, setIsValidEmail] = useState<boolean>(true);


//     const handleChange = (e) => {
//         const inputValue = e.target.value;
//         setEmail(inputValue);

//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         const isValid = emailRegex.test(inputValue);
//         setIsValidEmail(isValid);
//       };

//       const handleSendInvite = () => {
//         if (isValidEmail) {
//           // Perform invite logic here
//           console.log('Sending invite to:', email);
//           // You can add your logic to send the invite here
//         } else {
//           // Display an error message or handle invalid input
//           alert('Please enter a valid email address');
//         }
//       };

//     return (
//         <>

//        <div className={styles.overlay}></div>
//         <div className={styles.modalBackground}>
//             <div className={styles.modalContainer}>
//                 <div className={styles.titleCloseBtn}>
//                 <button onClick={() => closeModal(false)}> + </button>
//                 </div>
//                 <div className={styles.title}>
//                 </div>
//                 <div className={styles.heading}><p>Invite Friends:</p>
//                 </div>
//                 <div className={styles.body}> 
//                 <input className={styles.email}
//                  value={email} 
//                  onChange={handleChange}
//                  type="email"
//                  placeholder="Enter email id"
//                  required id="email"
//                  />
//                   {/* {!isValidEmail && (
//                   <p style={{ color: "red" }}>Please enter a valid email address</p>
//                     )} */}
//                 </div>
//                 <div className={styles.footer}>
//                 <button onClick={handleSendInvite}>Send Invite</button>
//                 </div>
//             </div>
//         </div>
//         </>
//     );
// }

// export default InviteFriendsModal;
///////////////commented code////////////////////////

import React, { useState } from "react";
import styles from "./InviteFriendsModal.module.css";

// Define the prop types for InviteFriendsModal
interface InviteFriendsModalProps {
  closeModal: (param: boolean) => void;
}

// Functional component for InviteFriendsModal
const InviteFriendsModal: React.FC<InviteFriendsModalProps> = ({ closeModal }) => {
  // State variables for email input and email validation
  const [email, setEmail] = useState<string>('');
  const [isValidEmail, setIsValidEmail] = useState<boolean>(true);

  // Event handler for email input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setEmail(inputValue);

    // Regular expression for validating email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(inputValue);
    setIsValidEmail(isValid);
  };

  // Event handler for sending the invite
  const handleSendInvite = () => {
    if (isValidEmail) {
      // Perform invite logic here
      console.log('Sending invite to:', email);
      // You can add your logic to send the invite here
    } else {
      // Display an error message or handle invalid input
      alert('Please enter a valid email address');
    }
  };

  // JSX rendering of the InviteFriendsModal component
  return (
    <>
      {/* Overlay to dim the background */}
      <div className={styles.overlay}></div>

      {/* Modal background */}
      <div className={styles.modalBackground}>
        <div className={styles.modalContainer}>
          {/* Close button */}
          <div className={styles.titleCloseBtn}>
            <button onClick={() => closeModal(false)}> + </button>
          </div>

          {/* Title section (can be added as needed) */}
          <div className={styles.title}></div>

          {/* Heading for the modal */}
          <div className={styles.heading}>
            <p>Invite Friends:</p>
          </div>

          {/* Body section containing the email input */}
          <div className={styles.body}>
            <input
              className={styles.email}
              value={email}
              onChange={handleChange}
              type="email"
              placeholder="Enter email id"
              required
              id="email"
            />
            {/* Validation message for invalid email */}
            {!isValidEmail && (
              <p style={{ color: "red" }}>Please enter a valid email address</p>
            )}
          </div>

          {/* Footer section with the "Send Invite" button */}
          <div className={styles.footer}>
            <button onClick={handleSendInvite}>Send Invite</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default InviteFriendsModal;
