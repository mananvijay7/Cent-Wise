import styles from "./Friends.module.css";
import ShowDebtOwesList from "../ShowDebtOwesList/ShowDebtOwesList";
import React, { useState, ChangeEvent, FormEvent,useEffect  } from "react";
import axios from 'axios';
import { Document, Types } from 'mongoose';


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
  }
  
  interface Participant {
    _id: Types.ObjectId;
  }
  
  interface Expense {
    _id: string,
    Payer: Types.ObjectId;
    participants: Participant[];
    amount: number;
    currency: string;
    created_by: Types.ObjectId;
    created_date: Date;
    partition: string[];
  }
  
  interface UserData extends Document {
    _id: string,
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
  }

const DashboardCmp = () => {
    const [userData, setUserData] = useState<UserData | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
              const response = await axios.get('/api/friends');
              const data = response.data;
              setUserData(data);
            } catch (error: any) {
              console.error('Error getting data from the database:', error.message);
            }
          };

          fetchData();
    }, []);

    return (
        <div>
            <div className={styles.mainContainer}>
                <div className={styles.listCard}>
                  <div className={styles.heading}>
                  <div className={styles.summary}>Friends</div>
                    <button className={styles.addFriendBtn}>
                    + Add Friend
                  </button>
                  </div>
                  <hr className={styles.hr}/>
                    <ShowDebtOwesList userData={userData}/>
                </div>
            </div>
        </div>
    );
}

export default DashboardCmp;