import React, { FC, useEffect, useRef } from "react";
import styles from "./AddExpense.module.css";

interface SecondModalProps {
  onClose: () => void;
}

const SecondModal: FC<SecondModalProps> = ({ onClose }) => {
  const modalContentRef = useRef<HTMLDivElement>(null);
 

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // Close the modal if clicked outside its content
      if (
        modalContentRef.current &&
        !modalContentRef.current.contains(target)
      ) {
        onClose();
      }
    };
 

    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [onClose]);
  return (
    <div className={styles.sideModal}>
      <div className={styles.modalContent2}>
        <h2>Groups Modal</h2>
        {/* Add your content for the second modal */}
        <button type="button" onClick={onClose} className={styles.cancel2}>
         X
        </button>
      </div>
    </div>
  );
};

export default SecondModal;
