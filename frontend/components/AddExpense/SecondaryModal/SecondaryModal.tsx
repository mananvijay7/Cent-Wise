import { useEffect, useRef, useState } from "react";
import styles from "./SecondaryModal.module.css";
import ShowModalListCard from "../ShowModalListCard/ShowModalListCard";
import axios from 'axios';
import { Document, Types } from 'mongoose';

interface Props {
    category: string;
}

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
  

//Component to add existing centwise user 
const SecondaryModal: React.FC<Props> = (props) => {

    const [email, setEmail] = useState<string>('');
    const [modal, setModal] = useState(true);
    const [dataList, setDataList] = useState({});
    const [userData, setUserData] = useState<UserData | null>(null);

    const category = props.category;
    let heading = "";
    let displayLists = [];

    useEffect(() => {
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
    }, []);

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