import React, { FC, useEffect, useRef, useState } from "react";
import styles from "./AddExpense.module.css";

interface FriendListModalProps {
  onClose: () => void;
  onClick: (friendList: string[]) => void;
}

const FriendListModal: FC<FriendListModalProps> = (props) => {
  const modalContentRef = useRef<HTMLDivElement>(null);
  const [selectedFriends, setSelectedFriends] = useState<string[]>([]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // Close the modal if clicked outside its content
      if (
        modalContentRef.current &&
        !modalContentRef.current.contains(target)
      ) {
        props.onClose();
      }
    };

    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [props.onClose]);

  const handleSave = () => {
    props.onClick(selectedFriends);
    props.onClose();
  };

  const handleCheckboxChange = (friend: string) => {
    const isSelected = selectedFriends.includes(friend);

    if (isSelected) {
      // Remove friend from the selected list
      setSelectedFriends((prevSelectedFriends) =>
        prevSelectedFriends.filter((selectedFriend) => selectedFriend !== friend)
      );
    } else {
      // Add friend to the selected list
      setSelectedFriends((prevSelectedFriends) => [...prevSelectedFriends, friend]);
    }
  };

  const list = ["Friend1", "Friend2", "Friend3", "Friend4", "Friend5"];

  return (
    <div className={styles.EqualModal}>
      <div ref={modalContentRef} className={styles.modalContent}>
        <h2>Select Friends</h2>
        <hr />
        {list.map((friend, index) => (
          <div className={`${styles.row} ${styles.card_input}`} key={index}>
            <label className={styles.label}>
              <input
                type="checkbox"
                name="friendCheckbox"
                className={styles.card_input_element}
                onChange={() => handleCheckboxChange(friend)}
                checked={selectedFriends.includes(friend)}
              />
              <span className={styles.panel_body}>{friend}</span>
            </label>
          </div>
        ))}
        <button type="button" className={styles.save} onClick={handleSave}>
          Save
        </button>
        <button type="button" onClick={props.onClose} className={styles.cancelEqual}>
          X
        </button>
      </div>
    </div>
  );
};

export default FriendListModal;
