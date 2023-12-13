import React, { useEffect, useState } from "react";
import styles from "./AllExpensesCmp.module.css"
import AllExpenses from "./AllExpenses";
import flightIcon from "../../../public/images/AeroplaneIcon.png";
import AddExpense from "../AddExpense/AddExpense";
import Settleup from "../Settleup/Settleup"
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


const AllExpensesCmp: React.FC = () => {
    const [allExpensesData, setAllExpensesData] = useState<Expense[]>([]);
    const [userId, setUserId] = useState<Types.ObjectId | null>(null);
    useEffect(() => {
      const getAllExpenses = async () => {
        try {
          const response = await axios.get('/api/expense/allData');
          setAllExpensesData(response.data);     
          console.log(response.data); 
          setUserId(response.data.userId);
        } catch (error: any) {
          // Handle errors
          console.error('Error fetching expenses:', error.message);
          // Your error handling logic goes here
        }
      };
      getAllExpenses();
      console.log(allExpensesData);
  }, []);
  
  return (
    <div>
      <AllExpenses />
      <div>
        {allExpensesData.map((expenseData) => (
          <div key={expenseData._id} >
               <span className={styles.expenseItem}>
            <span className={styles.monthdate}>
            <p className={styles.month}> {'December'}</p>
            <p className={styles.date}> {'12'}</p>
            </span>
            <img className={styles.icon} src={flightIcon} alt="Flight Icon" />
            <div className={styles.dataExpense}>
            <p className={styles.expense}>{expenseData.description}</p>
            <p className={styles.expense_type}>{expenseData.expenseType}</p>
            </div>
            
               <span>
               <p className={styles.paid}>You Paid:</p>
               <p className={styles.paidData}>{expenseData.usersInvolved.map((user) => user.paidShare).join(', ')}</p>
             </span>
                <span>
                  <p className={styles.lent}>You Lent:</p>
                  <p className={styles.lentData}>{expenseData.usersInvolved.map((user) => user.owedShare).join(', ')}</p>
                </span>
             
            </span>
            {<hr />}
          </div>
            
        
          
          
        ))}
      </div>
      
    </div>
  );
};

export default AllExpensesCmp;