import ShowAmountDetails from "../ShowAmountDetails/ShowAmountDetails";
import styles from "./DashboardCmp.module.css";
import ShowDebtOwesList from "../ShowDebtOwesList/ShowDebtOwesList";
import ShowDebtOwesGroupList from '../ShowDebtOwesList/ShowDebtOwesGroupList';
import React, { useState, ChangeEvent, FormEvent,useEffect  } from "react";
import axios from 'axios';
import { Document, Types } from 'mongoose';


interface UserInvolved {
  user: Types.ObjectId;
  paidShare: number;
  owedShare: number;
  user_first_name: string;
  user_last_name: string;
}

interface GroupInvolved {
  group: Types.ObjectId;
  group_name: string;
}

interface Partition {
  type: string;
}

interface Expense extends Document {
  Payer: Types.ObjectId;
  description: string;
  usersInvolved: UserInvolved[];
  groupInvolved: GroupInvolved[];
  amount: number;
  currency: string;
  created_by: Types.ObjectId;
  created_date: Date;
  partition: Partition[];
  expenseType: string;
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
}


const DashboardCmp = () => {
    const [friendExpense, setFriendExpense] = useState<Expense[] | null>(null);
    const [groupExpense, setGroupExpense] = useState<Expense[] | null>(null);
    const [userData, setUserData] = useState<UserData | null>(null);

    useEffect(() => {
      const fetchData = async () => {
          try {
              const friendResponse = axios.get('/api/expense/FriendData', { params: { expenseType: 'Individual' } });
              const groupResponse = axios.get('/api/expense/GroupData', { params: { expenseType: 'Group' } });
              const userResponse = axios.get('/api/dashboard');
  
              const [friendData, groupData, userData] = await Promise.all([friendResponse, groupResponse, userResponse]);
  
              setFriendExpense(friendData.data);
              setGroupExpense(groupData.data);
              setUserData(userData.data);
  
              console.log('friendExpense', groupData.data);
          } catch (error: any) {
              console.error('Error getting data from the database:', error.message);
          }
      };
      fetchData();
  }, []);
  

    return (
        <div>
            <div className={styles.mainContainer}>
                <div>
                    <div className={styles.summary}>Total Summary</div>
                    <div className={styles.container}>
                        <ShowAmountDetails label="Total amount you owe" amount={`$${userData?.totalOweAmount.toFixed(2)}`} color="orange" />
                        <ShowAmountDetails label="Total amount owe to you" amount={`$${userData?.totalOweToSelf.toFixed(2)}`} color="green" />
                        <ShowAmountDetails label="Total balance" amount={`$${(userData?.totalBalance ?? 0).toFixed(2)}`} color="grey" />

                    </div>
                    <hr className={styles.hr} />
                </div>
                <div className={styles.listCard}>
                    <div className={styles.summary}>Friends</div>
                    <ShowDebtOwesList friendExpense={friendExpense}/>
                </div>
            </div>
            <hr className={styles.hr} />
            <div className={styles.listCard}>
                <div className={styles.summary}>Groups</div>
                <ShowDebtOwesGroupList groupExpense={groupExpense}/>
            </div>
        </div>
    );
}

export default DashboardCmp;