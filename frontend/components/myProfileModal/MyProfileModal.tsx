import React, { useState } from "react";
import styles from './MyProfileModal.module.css';
import profileData from './userData.json';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

function MyProfileModal({ closeModal }) {
  const { fullName: initialFullName, email: initialEmail, phoneNumber: initialPhoneNumber } = profileData.person;

  const [fullName, setFullName] = useState(initialFullName);
  const [email, setEmail] = useState(initialEmail);
  const [phoneNumber, setPhoneNumber] = useState(initialPhoneNumber);

  const [editModeFullName, setEditModeFullName] = useState(false);
  const [editModeEmail, setEditModeEmail] = useState(false);
  const [editModePhoneNumber, setEditModePhoneNumber] = useState(false);

  const handleEditClickFullName = () => {
    setEditModeFullName(true);
    setEditModeEmail(false);
    setEditModePhoneNumber(false);
  };

  const handleEditClickEmail = () => {
    setEditModeEmail(true);
    setEditModeFullName(false);
    setEditModePhoneNumber(false);
  };

  const handleEditClickPhoneNumber = () => {
    setEditModePhoneNumber(true);
    setEditModeFullName(false);
    setEditModeEmail(false);
  };

  const handleSaveClick = () => {
    // Perform save logic here (e.g., send data to server)
    setEditModeFullName(false);
    setEditModeEmail(false);
    setEditModePhoneNumber(false);
  };

  const handleCancelClick = () => {
    // Reset fields to initial values
    setFullName(initialFullName);
    setEmail(initialEmail);
    setPhoneNumber(initialPhoneNumber);
    setEditModeFullName(false);
    setEditModeEmail(false);
    setEditModePhoneNumber(false);
  };

  return (
    <>
      <div className={styles.overlay}></div>

      <div className={styles.modalBackground}>
        <div className={styles.modalContainer}>
          <div className={styles.titleCloseBtn}>
            <button onClick={() => closeModal(false)}> + </button>
          </div>
          <div className={styles.title}>
            <img className={styles.userImg} src='src\assets\Yash Lambodiya.jpg' alt="User"></img>
          </div>
          <div className={styles.heading}>
            <p>Your Details:</p>
          </div>
          <div className={styles.body}>
            <div className={styles.name}>
              <p>
                Name: {editModeFullName ? (
                  <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} className={styles.editInput} />
                ) : (
                  <>
                    {fullName}
                    <span>
                      <ModeEditIcon onClick={handleEditClickFullName} />
                    </span>
                  </>
                )}
                {editModeFullName && (
                  <>
                    <button onClick={handleSaveClick}>Save</button>
                    <button onClick={handleCancelClick}>Cancel</button>
                  </>
                )}
              </p>
            </div>

            <div className={styles.email}>
              <p>
                Email: {editModeEmail ? (
                  <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} className={styles.editInput} />
                ) : (
                  <>
                    {email}
                    <span>
                      <ModeEditIcon onClick={handleEditClickEmail} />
                    </span>
                  </>
                )}
                {editModeEmail && (
                  <>
                    <button onClick={handleSaveClick}>Save</button>
                    <button onClick={handleCancelClick}>Cancel</button>
                  </>
                )}
              </p>
            </div>

            <div className={styles.phone}>
              <p>
                Phone: {editModePhoneNumber ? (
                  <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className={styles.editInput}/>
                ) : (
                  <>
                    {phoneNumber}
                    <span>
                      <ModeEditIcon onClick={handleEditClickPhoneNumber} />
                    </span>
                  </>
                )}
                {editModePhoneNumber && (
                  <>
                    <button onClick={handleSaveClick}>Save</button>
                    <button onClick={handleCancelClick}>Cancel</button>
                  </>
                )}
              </p>
            </div>
          </div>
          <div className={styles.footer}></div>
        </div>
      </div>
    </>
  );
}

export default MyProfileModal;

