// EqualModal.tsx
import React, { FC, useEffect, useRef } from "react";
import styles from "./AddExpense.module.css";

interface EqualModalProps {
  onClose: () => void;
}

const EqualModal: FC<EqualModalProps> = ({ onClose }) => {
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
    <div className={styles.EqualModal}>
      <div ref={modalContentRef} className={styles.equalModalContent}>
        <h2>Choose split options</h2>
        <hr/>
        {/* Add your content for the second modal */}
        <button type="button" onClick={onClose} className={styles.cancelEqual}>
          X
        </button>
      </div>
    </div>
  );
};

export default EqualModal;
