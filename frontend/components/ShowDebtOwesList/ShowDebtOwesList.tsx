  import ShowDebtOwesListCard from "../ShowDebtOwesListCard/ShowDebtOwesListCard";
  import styles from "./ShowDebtOwesList.module.css";
  import { Document, Types } from 'mongoose';


  const viewChartHandler = () => {
      alert("In Progress");
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

  interface Props {
    userData?: UserData | null;
  }

  const ShowDebtOwesList: React.FC<Props> = ({userData}) => {

      const friendsList = userData?.friends || [];

      return (
          <div className={styles.container}>
              <div>
                  <button className={styles.viewChartbtn} onClick={viewChartHandler}>View Chart</button>
              </div>

              <div className={styles.flexContainer}>

                  <div className={styles.flexChild}>
                      <div className={styles.label}>
                          You Owe
                      </div>
                      {friendsList.map((friend) => (
              <ShowDebtOwesListCard
                key={friend.friend._id} 
                imgSrc={"src/assets/person.jpg"} 
                username={`${friend.friend_first_name}` + `${friend.friend_last_name}`} 
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
                username={`${friend.friend_first_name}` + `${friend.friend_last_name}`} 
                amount={`$${friend.amountInDeal.toFixed(2)}`}
              />
            ))}
                  </div>
              </div>
          </div>
      );
  }

  export default ShowDebtOwesList;
