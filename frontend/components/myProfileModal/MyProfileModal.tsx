import React, { useState, useEffect } from "react";
import styles from './MyProfileModal.module.css';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import axios from 'axios';
import { Document, Types } from 'mongoose';

interface UserData extends Document {
  _id: string,
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  ph_no: string;
  created_date: Date;
  totalOweAmount: number;
  totalOweToSelf: number;
  totalBalance: number;
}


function MyProfileModal({ closeModal }) {
  let initial_first_name = '';
  let initial_last_name = '';
  let initial_email = '';
  let initial_ph_no = '';
  let [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    // Fetch user data when the component mounts
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/dashboard/userDetails');
        const data = response.data;
        setUserData(data);
      } catch (error: any) {
        console.error('Error getting data from the database:', error.message);
      }
    };

    fetchData();
    let initial_first_name = userData?.first_name;
    let initial_last_name = userData?.last_name;
    let initial_email = userData?.email;
    let initial_ph_no = userData?.ph_no;
  }, []);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const [editModeFullName, setEditModeFullName] = useState(false);
  const [editModeEmail, setEditModeEmail] = useState(false);
  const [editModePhoneNumber, setEditModePhoneNumber] = useState(false);

  const handleSave = async () => {
    try {
      const resourceId = userData?._id;
      const [firstName, lastName] = fullName.split(" ");
      if(firstName === '' || lastName === '' || email === ''){
        alert('Enter all of the values');
      }else if(!email.includes('@')){
        alert('Enter correct email address');
      }
      const updatedData = {
        first_name: firstName,
        last_name: lastName,
        ph_no: phoneNumber,
        email: email
      };
      const userId = userData?._id;
      const response = await axios.patch(`/api/dashboard/updateProfile/${userId}`, updatedData);
      console.log('PATCH request successful:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error making PATCH request:', error);
    }
  };

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
    handleSave();
    setEditModeFullName(false);
    setEditModeEmail(false);
    setEditModePhoneNumber(false);
  };

  const handleCancelClick = () => {
    // Reset fields to initial values
    let initialFullName = initial_first_name + initial_last_name;
    setFullName(initialFullName);
    setEmail(initial_email);
    setPhoneNumber(initial_ph_no);
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
                    {`${userData?.first_name}`} {` ${userData?.last_name}`}
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
                    {`${userData?.email}`}
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
                    {`${userData?.ph_no}`}
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
