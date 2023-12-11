// import React, { useState } from "react";
// import GroupNameCard from "./GroupNameCard";
// import styles from "./GroupCmp.module.css";
// import AddGroupModal from "./AddGroupsModal";

// const GroupCmp: React.FC = () => {
//     const [isModalOpen, setIsModalOpen] = useState(false);

//     const openModal = () => {
//         setIsModalOpen(true);
//     };

//     const closeModal = () => {
//         setIsModalOpen(false);
//     };

//     return (
//         <>
//             <div className={styles.mainGroupDiv}>
//                 <p className={styles.GroupsYouAreIn}>Groups you are in</p>
//                 <button className={styles.addGroupBtn} onClick={openModal}>
//                 <div className={styles.addBtn}>+ Add Group
//                 </div>
//                 </button>
//             </div>
//             <div>
//                 <GroupNameCard />
//             </div>
//             <AddGroupModal isOpen={isModalOpen} onClose={closeModal} />
//         </>
//     );
// };

// export default GroupCmp;
///////////////////commented version///////////

import React, { useState } from "react";
import GroupNameCard from "./GroupNameCard";
import styles from "./GroupCmp.module.css";
import AddGroupModal from "./AddGroupsModal";

// Functional component for the GroupCmp
const GroupCmp: React.FC = () => {
    // State variable to manage the modal's open/close state
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Function to open the modal
    const openModal = () => {
        setIsModalOpen(true);
    };

    // Function to close the modal
    const closeModal = () => {
        setIsModalOpen(false);
    };

    // JSX rendering of the GroupCmp component
    return (
        <>
            {/* Main container for the group component */}
            <div className={styles.mainGroupDiv}>
                {/* Heading for groups the user is in */}
                <p className={styles.GroupsYouAreIn}>Groups you are in</p>
                {/* Button to add a new group, triggers the openModal function on click */}
                <button className={styles.addGroupBtn} onClick={openModal}>
                    <div className={styles.addBtn}>+ Add Group</div>
                </button>
            </div>
            {/* Container for displaying group name cards */}
            <div>
                <GroupNameCard />
            </div>
            {/* AddGroupModal component with isOpen and onClose props */}
            <AddGroupModal isOpen={isModalOpen} onClose={closeModal} />
        </>
    );
};

export default GroupCmp;
