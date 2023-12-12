// EqualModal.tsx
import React, { FC, useEffect, useRef, useState } from "react";
import styles from "./AddExpense.module.css";

interface GroupListModalProps {
    onClose: () => void;
    onClick: (method: string) => void;
}

const GroupListModal: FC<GroupListModalProps> = (props) => {
    const modalContentRef = useRef<HTMLDivElement>(null);
    const [selectedGroup, setSelectedGroup] = useState<string>("");

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
        props.onClick(selectedGroup);
        props.onClose();
    }


    const handleRadioChange = (group: string) => {
        setSelectedGroup(group);
    };

    const list = ["Group1", "Group2", "Group3", "Group4", "Group5"];

    return (
        <div className={styles.EqualModal}>
            <div ref={modalContentRef} className={styles.modalContent}>
                <h2>Select Group</h2>
                <hr />
                {

                    list.map((group, index) => (
                        <div className={`${styles.row} ${styles.card_input}`} key={index}>
                            <label className={styles.label}>
                                <input
                                    type="radio"
                                    name="splitMethod"
                                    className={styles.card_input_element}
                                    onChange={() => handleRadioChange(group)}
                                    checked={selectedGroup === group}
                                />
                                <span className={styles.panel_body}>{group}</span>
                            </label>
                        </div>
                    ))
                }
                <button type="submit" className={styles.save} onClick={handleSave}>
                    Save
                </button>
                <button type="button" onClick={props.onClose} className={styles.cancelEqual}>
                    X
                </button>
            </div>
        </div>
    );
};

export default GroupListModal;
