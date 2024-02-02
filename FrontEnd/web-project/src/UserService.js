const BASE_URL = "http://127.0.0.1:8000";
let token = localStorage.getItem("jwtToken");

export const getUserInfo = async (userId) => {
  const response = await fetch(`${BASE_URL}/api/users/${userId}`, {
      headers: {
        "Token": token,
        "Content-Type": "application/json",
      },
    });
  const data = await response.json();
  return data;
};

export const updateUserProfile = async (userId, updatedUserData) => {
  const response = await fetch(`${BASE_URL}/api/users/${userId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Token": token,
    },
    body: JSON.stringify(updatedUserData),
  });
  const data = await response.json();
  return data;
};

export const deleteUserAccount = async (userId) => {
  const response = await fetch(`${BASE_URL}/api/users/${userId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Token": token,
    }
  });
  return response.ok;
};

export const searchUsers = async (keyword) => {
  const response = await fetch(`${BASE_URL}/api/users?keyword=${keyword}`, {
      headers: {
        "Token": token,
        "Content-Type": "application/json",
      },
    });
  const data = await response.json();
  return data;
};

export const logout = async(userId)=>{
    const response = await fetch(`${BASE_URL}/api/users/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Token": token,
      },
    });
    return response.ok;
};