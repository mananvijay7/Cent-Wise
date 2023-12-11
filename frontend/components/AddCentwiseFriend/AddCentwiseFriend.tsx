import { useRef, useState } from "react";
import styles from "./AddCentwiseFriend.module.css";


//Component to add existing centwise user 
const AddedCentwiseFriend: React.FC = () => {

    const [email, setEmail] = useState<string>('');
    const [modal, setModal] = useState(true);

    const modalContentRef = useRef<HTMLDivElement>(null);


    const handleFormSubmit = () => {
        alert("Add Friend Logic" + email);
    }

    const handleClose = () => {
        setModal(false);

    };

    const toggleModal = () => {
        setModal(!modal);
    }



    return (

        <>
            {modal && (
                <div ref={modalContentRef} className={styles.modal}>
                    <div onClick={handleClose} className={styles.overlay}></div>
                    <div className={styles.modalContent}>
                        <h3 className={styles.formHeading}>Add Friend</h3>
                        <form onSubmit={handleFormSubmit}>
                            <input
                                className={styles.inputs}
                                type="text"
                                value={email}
                                placeholder="Enter email address"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <br />
                            <div className={styles.buttonGroup}>
                                <button type="submit" className={styles.add}>
                                    Add Friend
                                </button>
                                <button
                                    type="button"
                                    onClick={toggleModal}
                                    className={styles.cancel}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}</>

    );
}

export default AddedCentwiseFriend;