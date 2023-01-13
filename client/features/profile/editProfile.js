import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const EditProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.me);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (evt) => {
    evt.preventDefault();
  };

  return (
    <div className="edit-profile-container">
      <form className="edit-profile-form">
        <div>
          <label htmlFor="first name">
            <small>First Name</small>
          </label>
          <input
            className="edit-profile-input"
            required
            name="first_name"
            defaultValue={user.first_name}
            type="text"
            onChange={(e) => setFirstName(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="last_name">
            <small>Last Name</small>
          </label>
          <input
            className="edit-profile-input"
            required
            name="last_name"
            defaultValue={user.last_name}
            type="text"
            onChange={(e) => setLastName(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="email">
            <small>Email</small>
          </label>
          <input
            className="edit-profile-input"
            required
            name="email"
            defaultValue={user.email}
            type="text"
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input
            className="edit-profile-input"
            required
            name="password"
            defaultValue="*********"
            type="text"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
      </form>
      <Link to="/profile">Cancel</Link>
      <button className="btn">Save Changes</button>
    </div>
  );
};

export default EditProfile;
