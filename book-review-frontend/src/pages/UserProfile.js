import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles.css";

const UserProfile = () => {
  const userId = "USER_ID";

  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/users/${userId}`)
      .then(response => setUser(response.data))
      .catch(error => console.error("Error fetching user:", error));
  }, []);

  if (!user) return <p>Loading profile...</p>;

  return (
    <div className="profile-container">
      <h1>👤 Profile</h1>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
    </div>
  );
};

export default UserProfile;
