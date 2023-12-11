import React, { useState } from 'react';
import ShowDebtOwesListCard from "../ShowDebtOwesListCard/ShowDebtOwesListCard";
import styles from "./ShowDebtOwesList.module.css";
import ChartModal from "../ChartVisuals/ChartModal";

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
    expenses: any[]; // Change 'Expense[]' to 'any[]' for simplicity
  };
  amountInDeal: number;
}

interface UserData {
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
  expenses: any[]; // Change 'Expense[]' to 'any[]' for simplicity
}

interface Props {
  userData?: UserData | null;
}

const ShowDebtOwesList: React.FC<Props> = ({ userData }) => {
  const friendsList = userData?.friends || [];
  const [isModalVisible, setModalVisible] = useState(false);

  const viewChartHandler = () => {
    setModalVisible(true);
  };

  const closeModalHandler = () => {
    setModalVisible(false);
  };

  return (
    <div className={styles.container}>
      <div>
        <button className={styles.viewChartbtn} onClick={viewChartHandler}>View Chart</button>
      </div>
      {isModalVisible && <ChartModal isVisible={isModalVisible} onClose={closeModalHandler} />}
      <div className={styles.flexContainer}>
        <div className={styles.flexChild}>
          <div className={styles.label}>You Owe</div>
          {friendsList.map((friend) => (
            <ShowDebtOwesListCard
              key={friend.friend._id}
              imgSrc={"src/assets/person.jpg"}
              username={friend.friend.first_name}
              amount={`$${friend.amountInDeal.toFixed(2)}`}
            />
          ))}
        </div>
        <div className={styles.flexChild}>
          <div className={styles.label}>You are owed</div>
          {friendsList.map((friend) => (
            <ShowDebtOwesListCard
              key={friend.friend._id}
              imgSrc={"src/assets/person.jpg"}
              username={friend.friend.first_name}
              amount={`$${friend.amountInDeal.toFixed(2)}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ShowDebtOwesList;
