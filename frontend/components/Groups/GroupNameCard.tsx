import React, {useState, useEffect} from "react";
import styles from "./GroupNameCard.module.css";

interface Group {
  _id: number;
  icon: string;
  title: string;
  "You paid": string;
  "You lent": string;
}
function GroupNameCard() {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [groups, setGroups] =  useState<Group[]>([]); //using the useState hook of react to know the separate state if each component

      const fetchData=()=>{
          fetch('http://localhost:5173/components/Groups/groupData.json')
          .then((res)=>res.json()) //the fetched data is in json format so we have to store it in json format as well 
          .then((data: Group[]) => {
            setGroups(data);
              // console.log(data) //just to check the data is being fetched or not 
          })
          .catch(e=>console.log(e.message));//error handling if the data doesnt get fetched
      };
  
      //using the useEffect hook so that when the site loads the user sees the dynamic data as the first thing on the screen
      useEffect(()=>{
          fetchData();
           //to trigger the detchdata function, whihc is to use the declared function
      },[]);
      <img src=""></img>

    return (
      <>
<div className={styles.GroupNameCard}>
    {groups.map((group) => (
      <div key={group._id} className={styles.groupCard}>
         <div className={styles.horizontalLine}></div>
      <div className={styles.justBeforeTheDp}>
             <img
              className={styles.userProfile}
              src={group.icon}
              alt={`Group Icon for ${group.title}`}
            />
          <div className={styles.groupDetails}>
                <p className={styles.groupName}>{group.title}</p>
                </div>
            <div className={styles.groupExpenses}>
              <div className={styles.youPaid}>
                 <p>You paid</p>
                 <p className={styles.paidAmount}>{group["You paid"]}</p>
              </div>
                <div className={styles.youLent}>
                  <p>You lent</p>
                  <p className={styles.lentAmount}>{group["You lent"]}</p>
                </div>
            </div>
          </div>
       
    </div>
   ))}
  </div>
  </>
);
}

export default GroupNameCard;