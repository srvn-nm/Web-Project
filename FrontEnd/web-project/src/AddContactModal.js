import React, { useState } from "react";
import api from "./api";

const AddContactModal = ({ onClose }) => {
  const [contactName, setContactName] = useState("");

  const handleAddContact = async () => {
    try {
      const newContact = { name: contactName };
      await api.addContact(localStorage.getItem('userId'), newContact);
      onClose();
    } catch (error) {
      alert("Error adding contact: "+ error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter username"
        value={contactName}
        onChange={(e) => setContactName(e.target.value)}
      />
      <button onClick={handleAddContact}>Add Contact</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default AddContactModal;
