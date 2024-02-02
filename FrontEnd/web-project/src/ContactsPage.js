import React, { useState, useEffect } from "react";
import ContactList from "./ContactList";
import AddContactModal from "./AddContactModal";
import { getUsersContacts, addContact, deleteContact } from "./api"; // به این فانکشن‌ها باید بر اساس نیازهای شما دست زد

const ContactsPage = () => {
  const [contacts, setContacts] = useState([]);
  const [showAddContactModal, setShowAddContactModal] = useState(false);

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    try {
      const contactsData = await getUsersContacts();
      setContacts(contactsData);
    } catch (error) {
      alert("Error loading contacts: "+ error);
    }
  };

  const handleAddContact = async (newContact) => {
    try {
      await addContact(newContact);
      loadContacts();
    } catch (error) {
      alert("Error adding contact: "+ error);
    }
  };

  const handleDeleteContact = async (contactId) => {
    try {
      await deleteContact(contactId);
      loadContacts();
    } catch (error) {
      alert("Error deleting contact: "+ error);
    }
  };

  return (
    <div className="contacts-page">
      <h2>Contact List</h2>
      <button onClick={() => setShowAddContactModal(true)}>Add Contact</button>
      <ContactList contacts={contacts} onDeleteContact={handleDeleteContact} />
      {showAddContactModal && (
        <AddContactModal
          onClose={() => setShowAddContactModal(false)}
          onAddContact={handleAddContact}
        />
      )}
    </div>
  );
};

export default ContactsPage;
