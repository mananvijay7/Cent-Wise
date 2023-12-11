import React, { useState, useEffect } from "react";
import styles from "./AddGroupsModal.module.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface AddGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddGroupModal: React.FC<AddGroupModalProps> = ({ isOpen, onClose }) => {
  const [groupName, setGroupName] = useState<string>("");
  const [showAddMembers, setShowAddMembers] = useState<boolean>(false);
  const [newMemberName, setNewMemberName] = useState<string>("");
  const [groupMembers, setGroupMembers] = useState<string[]>([]); // Initial member is the user

  const navigate = useNavigate();

  useEffect(() => {
    // Reset component state when the component is mounted
    setGroupName("");
    setShowAddMembers(false);
    setNewMemberName("");
    setGroupMembers([]);
  }, [isOpen]);

  const handleGroupNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value;
    setGroupName(name);
    setShowAddMembers(name.length > 0); // Show add members button when group name is not empty
  };

  const handleAddMember = () => {
    if (newMemberName.trim() !== "") {
      setGroupMembers([...groupMembers, newMemberName]);
      setNewMemberName(""); // Clear the input after adding a member
    }
  };

  const handleSave = () => {
    // You can handle the save action here, for example, send the group name and members to a function or API
    console.log("Group Name:", groupName);
    console.log("Group Members:", groupMembers);
    createGroup(groupName, groupMembers);
    // Close the modal after saving
    onClose();
  };

  const handleModalClose = () => {
    // Clear changes and close the modal without saving
    setGroupName("");
    setShowAddMembers(false);
    setNewMemberName("");
    setGroupMembers([]);
    onClose();
  };

  const createGroup = async (groupName: string, groupMembers: string[]) => {
    try {
      // Make a request to your server to create the group
      const response = await axios.post('/api/groups/createGroup',
        {
          description: groupName,
          users: groupMembers,
        },
      );

      navigate('/groups');

      // Log the response or handle it as needed
      console.log('Group creation response:', response.data);
    } catch (error: any) {
      // Handle errors, e.g., log them or show an error message to the user
      console.error('Error creating group:', error.message);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.modal}>
      <div className={styles.modalContainer}>
        <div className={styles.header}>
          <img className={styles.logo} src="../components/Assets/Centwise.png" alt="Logo" />
          <span>
            <button className={styles.close} onClick={handleModalClose}>
              <span>+</span>
            </button>
          </span>
        </div>
        <div className={styles.body}>
          <p className={styles.startANewGrp}>START A NEW GROUP</p>
          <div>
            <div className={styles.myGrpShallBCalld}>My group shall be called...</div>
            <input
              type="text"
              placeholder="Enter group name"
              value={groupName}
              onChange={handleGroupNameChange}
              className={styles.groupNameInput}
            />
          </div>
          {showAddMembers && (
            <div>
              <p className={styles.groupMembers}>Group Members:</p>
              <ul className={styles.memberList}>
                {groupMembers.map((member, index) => (
                  <li key={index}>{member}</li>
                ))}
              </ul>
              <div>
                <input
                  type="text"
                  placeholder="Enter members email address"
                  value={newMemberName}
                  onChange={(event) => setNewMemberName(event.target.value)}
                  className={styles.addAPerson}
                />
                <button onClick={handleAddMember} className={styles.addMembersButton}>
                   Add a person
                </button>
              </div>
            </div>
          )}
          <button onClick={handleSave} className={styles.saveButton}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddGroupModal;
