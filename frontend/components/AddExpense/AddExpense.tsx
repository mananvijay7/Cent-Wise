// Modal.tsx
import React, { useState, useEffect, useRef } from "react";
import styles from "./AddExpense.module.css";
import SecondModal from "./SecondModal";
import EqualModal from "./EqualModal";
import axios from 'axios';
import { Document, Types } from 'mongoose';
// import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import SecondaryModal from "./SecondaryModal/SecondaryModal";

interface Friend {
  friend: {
    _id: string;
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    ph_no: string;
    created_date: Date;
    totalOweAmount: number;
    totalOweToSelf: number;
    totalBalance: number;
    friends: Friend[];
    expenses: Expense[];
  };
  amountInDeal: number;
  friend_first_name: string;
  friend_last_name: string;
}

interface Participant {
  _id: Types.ObjectId;
}

interface Expense {
  _id: string;
  Payer: Types.ObjectId;
  participants: Participant[];
  amount: number;
  currency: string;
  created_by: Types.ObjectId;
  created_date: Date;
  partition: string[];
}

interface Group {
  group: Types.ObjectId;
  group_name: string;
  you_paid: number;
  you_lent: number;
}

interface UserData extends Document {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  ph_no: string;
  created_date: Date;
  totalOweAmount: number;
  totalOweToSelf: number;
  totalBalance: number;
  friends: Friend[];
  expenses: Expense[];
  groups: Group[];
}

const Modal: React.FC = () => {
  const [modal, setModal] = useState(false);
  const [showSecondModal, setShowSecondModal] = useState(false);
  const [showEqualModal, setShowEqualModal] = useState(false);
  const [showSecondaryModal, setSecondaryModal] = useState(false);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [secondModalCat, setSecondModalCat] = useState("");
  const [userData, setUserData] = useState<UserData | null | undefined>(undefined);

  const modalContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      if (
        target.classList.contains(styles.overlay) &&
        !target.closest(`.${styles.modalContent}`) &&
        !target.closest(`.${styles.secondModalContent}`) &&
        !target.closest(`.${styles.equalModalContent}`)
      ) {
        handleClose();
      }
      if (showCalendar && !target.closest(".react-calendar")) {
        setShowCalendar(false);
      }

      const fetchData = async () => {
        try {
          const response = await axios.get('/api/dashboard');
          const data = response.data;
          setUserData(data);
        } catch (error: any) {
          console.error('Error getting data from the database:', error.message);
        }
      };

      fetchData();

    };

    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [showCalendar]);

  const toggleModal = () => {
    setModal(!modal);
    closeSecondModal();
  };

  const toggleSecondModal = () => {
    setShowSecondModal(!showSecondModal);
  };

  const toggleEqualModal = (e?: React.MouseEvent<HTMLButtonElement>) => {
    if (e) {
      e.stopPropagation();
    }

  };

  const toggleSecondaryModal = (e?: React.MouseEvent<HTMLButtonElement>) => {
    if (e) {
      e.stopPropagation();
    }
    closeSecondaryModal();
    setSecondModalCat("split");
    setSecondaryModal(!showSecondaryModal);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    toggleModal();
    toggleSecondModal();
    toggleEqualModal();
    handleClose();
  };

  const handleClose = () => {
    setDescription("");
    setAmount("");
    setModal(false);
    setShowSecondModal(false);
    setShowEqualModal(false);
    closeSecondModal();

  };

  const closeSecondModal = () => {
    setShowSecondModal(false);
  };

  const closeSecondaryModal = () => {
    setSecondaryModal(false);
  };
  const closeEqualModal = () => {
    setShowEqualModal(false);
  };

  return (
    <>
      <button onClick={toggleModal} className={styles.btnModal}>
        Open
      </button>

      {
        modal && (
          <div
            ref={modalContentRef}
            className={styles.modal}
          >
            <div onClick={handleClose} className={styles.overlay}></div>
            <div className={styles.modalContent}>
              <h3>Add an expense</h3>
              <form onSubmit={handleFormSubmit}>
                <label className={styles.description}>
                  <input
                    type="text"
                    value={description}
                    placeholder="Enter description"
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </label>
                <br />
                <hr />
                <label className={styles.currency}>
                  $:
                  <input
                    type="text"
                    value={amount}
                    onChange={(e) =>
                      setAmount((e.target as HTMLInputElement).value)
                    }
                    onInput={(e) => {
                      e.currentTarget.value = e.currentTarget.value.replace(
                        /[^0-9.]/g,
                        ""
                      );
                    }}
                  />
                </label>

                <br />
                <hr />
                <label>
                  Paid by:
                  <button
                    type="button"
                    value="paidBy"
                    className={styles.btn}
                    onClick={toggleSecondModal}
                  >
                    Select
                  </button>
                </label>

                <label>
                  and Split:
                  <button
                    type="button"
                    value="split"
                    className={styles.btn}
                    onClick={toggleSecondaryModal}
                  >
                    Equally
                  </button>
                </label>
                <br />
                <label>
                  People:
                  <button
                    type="button"
                    className={styles.btn}
                    onClick={toggleSecondModal}
                  >
                    Select
                  </button>
                </label>
                <br />
                <DatePicker
                  className={styles.date}
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  popperPlacement="right-start"
                  onFocus={() => setShowSecondModal(false)}
                />
                <br />
                {/* <button type="button" className={styles.group}>
                  Select Group
                </button> */}

                <div className={styles.buttonGroup}>
                  <button type="submit" className={styles.save}>
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={toggleModal}
                    className={styles.cancel}
                  >
                    Cancel
                  </button>
                  <button className={styles.closeModal} onClick={toggleModal}>
                    X
                  </button>
                </div>
              </form>
            </div>
          </div>
        )
      }

      {showSecondModal && <SecondModal onClose={closeSecondModal} />}
      {/*showEqualModal && <EqualModal onClose={closeEqualModal} />*/}
      {showSecondaryModal && <SecondaryModal category="split"/>}
    </>
  );
};

export default Modal;
