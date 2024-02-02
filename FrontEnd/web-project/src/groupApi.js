const BASE_URL = "https://127.0.0.1:8000"; // Replace with your actual API base URL

const api = {
  // Function to fetch group information
  getGroupInfo: async (groupId) => {
    const response = await fetch(`${BASE_URL}/api/groups/${groupId}`, {
      headers: {
        "Token": localStorage.getItem("jwtToken").toString(),
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch group info");
    }
    return response.json();
  },

  // Function to fetch group messages
  getGroupMessages: async (groupId) => {
    const response = await fetch(`${BASE_URL}/api/groups/${groupId}/messages`, {
      headers: {
        "Token": localStorage.getItem("jwtToken").toString(),
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch group messages");
    }
    return response.json();
  },

  // Function to create a new group
  createGroup: async () => {
    const response = await fetch(`${BASE_URL}/api/groups`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Token": localStorage.getItem("jwtToken").toString(),
      },
    });

    if (!response.ok) {
      throw new Error("Failed to create group");
    }

    return response.json();
  },

  // Function to delete a group
  deleteGroup: async (groupId) => {
    const response = await fetch(`${BASE_URL}/api/groups/${groupId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Token": localStorage.getItem("jwtToken").toString(),
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete group");
    }
  },

  // Function to add a user to a group
  addUserToGroup: async (groupId, userId) => {
    const response = await fetch(`${BASE_URL}/api/groups/${groupId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Token": localStorage.getItem("jwtToken").toString(),
      },
      body: JSON.stringify({ userId }),
    });

    if (!response.ok) {
      throw new Error("Failed to add user to group");
    }

    return response.json();
  },

  // Function to remove a user from a group
  removeUserFromGroup: async (groupId, userId) => {
    const response = await fetch(
      `${BASE_URL}/api/groups/${groupId}/${userId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Token": localStorage.getItem("jwtToken").toString(),
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to remove user from group");
    }
  },
};

export default api;
