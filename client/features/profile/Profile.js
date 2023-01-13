import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Profile = () => {
  const user = useSelector((state) => state.auth.me);

  return (
    <div>
      <h2>User Info</h2>
      <h3>
        First Name <br></br>
        {user.first_name}
      </h3>
      <h3>
        Last Name <br></br>
        {user.last_name}
      </h3>
      <h3>
        Email <br></br>
        {user.email}
      </h3>
      <h3>
        Password <br></br>*******
      </h3>
      <Link to="/edit-profile">Edit</Link>
      <button>View order history</button>
    </div>
  );
};

export default Profile;
