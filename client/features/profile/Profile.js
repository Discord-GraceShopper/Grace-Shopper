import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Profile = () => {
  const user = useSelector((state) => state.auth.me);

  return (
    <div className="profile-container">
      <h2 className="user-info-header">User Info</h2>
      <div className="profile-grid">
        <div className="profile-first-name">
          <h3>First Name</h3>
          <h4>{user.first_name}</h4>
        </div>
        <div className="profile-last-name">
          <h3>Last Name</h3>
          <h4>{user.last_name}</h4>
        </div>
        <div className="profile-email">
          <h3>Email</h3>
          <h4>{user.email}</h4>
        </div>
        <div className="profile-password">
          <h3>Password</h3> <h4>*******</h4>
        </div>
      </div>

      <Link className="link profile-edit-link" to="/edit-profile">
        Edit
      </Link>
      <Link to="/purchase-history">
        <button className="btn view-order-history-btn">
          View order history
        </button>
      </Link>
    </div>
  );
};

export default Profile;
