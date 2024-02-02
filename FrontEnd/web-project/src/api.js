const BASE_URL = "http://127.0.0.1:8000";
const userId = localStorage.getItem("userId");
const api = {
  getUsersContacts: async () => {
    const response = await fetch(`${BASE_URL}/api/users/${userId}/contacts`, {
      headers: {
        "Token": localStorage.getItem("jwtToken").toString(),
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  },

  addContact: async (newContact) => {
    const response = await fetch(`${BASE_URL}/api/users/${userId}/contacts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Token": localStorage.getItem("jwtToken").toString()
      },
      body: JSON.stringify(newContact),
    });
    const data = await response.json();
    return data;
  },

  deleteContact: async (contactId) => {
    const response = await fetch(
      `${BASE_URL}/api/users/${userId}/contacts/${contactId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Token: localStorage.getItem("jwtToken").toString(),
        },
      }
    );
    const data = await response.json();
    return data;
  },
};

export default api;
