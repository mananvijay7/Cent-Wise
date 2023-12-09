import React, { useEffect, useState } from "react";
import styles from "./Settleup.module.css";
import flightIcon from "../Assets/flight.png";
import UserListModal from "./UserListModal";
import RecipientListModal from "./RecipientListModal";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

interface RecordCashModalProps {
  onClose: (e?: React.MouseEvent) => void;
}

const RecordCashModal: React.FC<RecordCashModalProps> = ({ onClose }) => {
  const [amount, setAmount] = useState<string>("");
  const [startDate, setStartDate] = useState<Date | null>(new Date()); // Set initial value to today's date
  const [userListModalOpen, setUserListModalOpen] = useState<boolean>(false);
  const [recipientListModalOpen, setRecipientListModalOpen] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<string | null>(null);

  const toggleModal = () => {
    onClose();

    setUserListModalOpen(false);
    setRecipientListModalOpen(false);
  };

  const toggleUserListModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setUserListModalOpen(!userListModalOpen);
    setRecipientListModalOpen(false);
    setOpenModal(userListModalOpen ? null : 'user');
  };

  const toggleRecipientListModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setRecipientListModalOpen(!recipientListModalOpen);
    setUserListModalOpen(false);
    setOpenModal(recipientListModalOpen ? null : 'recipient');
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      if (!target.closest(`.${styles.recordCashModalContent}`)) {
        onClose();
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [onClose, toggleModal]);

  return (
    <>
      <div className={styles.overlay2}></div>
      <div className={styles.recordCashModalContent} onClick={(e) => e.stopPropagation()}>
        <h2>Settle Up</h2>
        <hr className={styles.hr}></hr>
        <button className={styles.closeModal} onClick={toggleModal}>
          X
        </button>
        <img className={styles.icon1} src={flightIcon} alt="Flight Icon" />
        {/* <p className={styles.arrow}> --------| </p> */}
        <img className={styles.icon2} src={flightIcon} alt="Flight Icon" />
        <br/><br/>
        <div className={styles.buttonGroup}>
          <button className={styles.you} onClick={(e) => toggleUserListModal(e)}>
            You
          </button>
                    <span className={styles.paid}>paid</span>
          <button className={styles.user} onClick={(e) => toggleRecipientListModal(e)}>
            User
          </button>
          <br/> <br/>
          <label className={styles.dollar}>
            $:
            <input
              type="text"
              value={amount}
              placeholder="Enter Amount"
              onChange={(e) => setAmount((e.target as HTMLInputElement).value)}
              onInput={(e) => {
                e.currentTarget.value = e.currentTarget.value.replace(/[^0-9.]/g, "");
              }}
            />
          </label>
          <br />
         
          <DatePicker
            className={styles.date}
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            popperPlacement="right-start"
            onFocus={() => setOpenModal(null)} // Close other modals on date picker focus
          />
          <hr></hr>
          <button className={styles.saveButton} onClick={onClose}>
            Save
          </button>
          <button className={styles.cancelButton} onClick={onClose}>
            Cancel
          </button>
        </div>
        {userListModalOpen && openModal === 'user' && <UserListModal onClose={() => setUserListModalOpen(false)} />}
        {recipientListModalOpen && openModal === 'recipient' && (
          <RecipientListModal onClose={() => setRecipientListModalOpen(false)} />
        )}
      </div>
    </>
  );
};

export default RecordCashModal;
