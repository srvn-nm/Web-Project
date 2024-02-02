import React, { useState } from 'react';

const CreateGroupModal = ({ onClose, onCreateGroup }) => {
  const [groupName, setGroupName] = useState('');

  const handleCreateGroup = () => {
    // Perform validation if needed
    if (groupName.trim() !== '') {
      onCreateGroup(groupName);
      onClose();
    }
  };

  return (
    <div className="modal">
      <h2>Create Group</h2>
      <input
        type="text"
        placeholder="Enter group name"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
      />
      <button onClick={handleCreateGroup}>Create</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default CreateGroupModal;