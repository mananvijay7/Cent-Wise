import { useRef, useState } from "react";
import styles from "./SecondaryModal.module.css";
import ShowModalListCard from "../ShowModalListCard/ShowModalListCard";

interface Props {
    category: string;
}

//Component to add existing centwise user 
const SecondaryModal: React.FC<Props> = (props) => {

    const [email, setEmail] = useState<string>('');
    const [modal, setModal] = useState(true);
    const [dataList, setDataList] = useState({});

    const category = props.category;
    let heading = "";
    let displayLists = [];

    if(category === "paidBy") {
        heading = "Paid by";
        //Fetch all friends
        //Set friends name in displayList
        displayLists.push("Yash");
        displayLists.push("Manan");
    } else if (category === "split") {
        heading = "Split Method";
        displayLists.push("Equally");
        displayLists.push("Unequally");
        setDataList(displayLists);
    }

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
                        <h3 className={styles.formHeading}>{heading}</h3>
                        {
                            displayLists.map((data) => (
                                <ShowModalListCard item={data}/>
                            ))
                        }
                    </div>
                </div>
            )}</>

    );
}

export default SecondaryModal;