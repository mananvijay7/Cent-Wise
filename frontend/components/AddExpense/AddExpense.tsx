// Modal.tsx
import React, { useState, useEffect, useRef } from "react";
import styles from "./AddExpense.module.css";
// import "react-datepicker/dist/react-datepicker.css";
import SelectExpenseType from "./SelectExpenseType";
import SelectSplitMethod from "./SelectSplitMethod";
import GroupListModal from "./GroupListModal";
import FriendListModal from "./FriendListModal";

const Modal: React.FC = () => {
  const [modal, setModal] = useState(false);
  const [showSecondModal, setShowSecondModal] = useState(false);
  const [showExpenseTypeModal, setShowExpenseTypeModal] = useState(false);
  const [showSplitMethodModal, setshowSplitMethodModal] = useState(false);
  const [showGroupListModal, setShowGroupListModal] = useState(false);
  const [showFriendListModal, setShowFriendListModal] = useState(false);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);
  const [splitMethod, setSplitMethod] = useState("Equal");
  const [expenseType, setExpenseType] = useState("Individual");
  const [participantType, setParticipantType] = useState("Friends");
  const [selectedGroup, setSelectedGroup] = useState("");
  const [selectedFriendList, setSelectedFriendList] = useState({});

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
    };

    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [showCalendar]);

  const toggleModal = () => {
    setModal(!modal);
    //closeSecondModal();
  };

  const toggleSecondModal = () => {
    setShowSecondModal(!showSecondModal);
    console.log("sec: " + showSecondModal);
  };

  const toggleSplitMethodModal = (e?: React.MouseEvent<HTMLButtonElement>) => {
    if (e) {
      e.stopPropagation();
    }
    setshowSplitMethodModal(!showSplitMethodModal);
  };

  const toggleParticipantModal = (e?: React.MouseEvent<HTMLButtonElement>) => {
    if (e) {
      e.stopPropagation();
    }
    if(participantType === "Friends") {
      setShowFriendListModal(!showFriendListModal);
    } else {
      setShowGroupListModal(!showGroupListModal);
    }
  };

  const toggleExpenseTypeModal = (e?: React.MouseEvent<HTMLButtonElement>) => {
    if (e) {
      e.stopPropagation();
    }
    setShowExpenseTypeModal(!showExpenseTypeModal);
    console.log("showExpenseTypeModal at 62" + showExpenseTypeModal);
  };


  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    toggleModal();
    handleClose();
  };

  const handleClose = () => {
    setDescription("");
    setAmount("");
    setModal(false);
    setShowSecondModal(false);
    console.log("sec: " + showSecondModal);
    closeSplitMethodModal();
    closeSecondModal();
    closeExpenseTypeModal();
    console.log("showExpenseTypeModal at 92" + showExpenseTypeModal);

  };

  const closeSecondModal = () => {
    setShowSecondModal(false);
    console.log("sec: " + showSecondModal);
  };

  const closeExpenseTypeModal = () => {
    setShowExpenseTypeModal(false);
    console.log(showExpenseTypeModal);
  };

  const closeSplitMethodModal = () => {
    setshowSplitMethodModal(false);
  };

  const closeGroupListModal = () => {
    setShowGroupListModal(false);
  };

  const closeFriendListModal = () => {
    setShowFriendListModal(false);
  };

  const handleChangeSplitMethod = (method: string) => {
    setSplitMethod(method);
  }

  const handleChangeGroup = (group: string) => {
    setSelectedGroup(group);
  }

  const handleChangeFriendList = (friendList: string[]) => {
    setSelectedFriendList(friendList);
  }

  const handleChangeExpenseMethod = (type: string) => {
    setExpenseType(type);
    if(type === "Individual") {
      setParticipantType("Friends");
    } else {
      setParticipantType("Groups");
    }
  }

  console.log(selectedFriendList);
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
                  <input type="text" value={description} placeholder="Enter description" onChange={(e) => setDescription(e.target.value)}/>
                </label>
                <br />
                <hr />
                <label className={styles.currency}>
                  $:
                  <input type="text" value={amount} onChange={(e) => setAmount((e.target as HTMLInputElement).value)} onInput={(e) => { e.currentTarget.value = e.currentTarget.value.replace(
                        /[^0-9.]/g,"");}}/>
                </label>

                <br />
                <hr />
                <label>
                  Expense type:
                  <button type="button" value="expenseType" className={styles.btn} onClick={toggleExpenseTypeModal}>
                    { expenseType }
                  </button>
                </label>

                <label>
                  and Split:
                  <button
                    type="button"
                    value="split"
                    className={styles.btn}
                    onClick={toggleSplitMethodModal}
                  >
                    { splitMethod }
                  </button>
                </label>
                <br />
                <label>
                  { participantType }:
                  <button
                    type="button"
                    className={styles.btn}
                    onClick={toggleParticipantModal}
                  >
                    { participantType === "Friends" ? "..." : selectedGroup}
                  </button>
                </label>
                <br />

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

      {console.log("showExpenseTypeModal at 62" + showExpenseTypeModal)}
      {showExpenseTypeModal && <SelectExpenseType onClose={closeExpenseTypeModal} onClick={handleChangeExpenseMethod}/>}
      {showSplitMethodModal && <SelectSplitMethod onClose={closeSplitMethodModal} onClick={handleChangeSplitMethod}/>}
      {showGroupListModal && <GroupListModal onClose={closeGroupListModal} onClick={handleChangeGroup}/>}
      {showFriendListModal && <FriendListModal onClose={closeFriendListModal} onClick={handleChangeFriendList}/>}
    </>
  );
};

export default Modal;
