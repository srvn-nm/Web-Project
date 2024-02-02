import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  getUserInfo,
  updateUserProfile,
  deleteUserAccount,
  logout
} from "./UserService";

const UserProfile = ({ userId }) => {
  const [user, setUser] = useState({});
  const [editedUser, setEditedUser] = useState({});
  const history = useHistory();

  useEffect(() => {
    // Fetch user information when component mounts
    const fetchUserInfo = async () => {
      const userData = await getUserInfo(userId);
      setUser(userData);
      setEditedUser(userData); // Set initial values for editing
    };

    fetchUserInfo();
  }, [userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleUpdateProfile = async () => {
    await updateUserProfile(userId, editedUser);
    //refetch user info after the update
    const updatedUserInfo = await getUserInfo(userId);
    setUser(updatedUserInfo);
  };

  const handleLogout = async () => {
    await logout(userId);
    // Perform logout actions (remove token, user info, etc.)
    localStorage.removeItem("authToken");
    localStorage.removeItem("userInfo");
    // Redirect to the login page
    history.push("/login");
  };

  const handleDeleteAccount = async () => {
    await deleteUserAccount(userId);
    localStorage.removeItem("authToken");
    localStorage.removeItem("userInfo");
    // After deleting the account, redirect to the login page
    history.push("/login");
  };

  return (
    <div className="user-profile">
      <img src={editedUser.profilePicture} alt="Profile" />
      <input
        type="text"
        name="username"
        value={editedUser.username}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="status"
        value={editedUser.status}
        onChange={handleInputChange}
      />
      {/* Add more input fields for other user profile information */}
      <button onClick={handleUpdateProfile}>Save Changes</button>
      <button onClick={handleLogout}>Log Out</button>
      <button onClick={handleDeleteAccount}>Delete Account</button>
    </div>
  );
};

export default UserProfile;
