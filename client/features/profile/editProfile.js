import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { update } from "../auth/authSlice";

const EditProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.me);
  const id = user.id;

  const [first_name, setFirstName] = useState(user.first_name);
  const [last_name, setLastName] = useState(user.last_name);
  const [email, setEmail] = useState(user.email);
  // const [password, setPassword] = useState(user.password);

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    dispatch(update({ id, first_name, last_name, email }));
    navigate("/profile");
  };

  return (
    <div className="edit-profile-container">
      <form className="edit-profile-form" onSubmit={handleSubmit}>
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
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        {/* <div>
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input
            className="edit-profile-input"
            required
            name="password"
            placeholder="*********"
            type="text"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div> */}
        <button className="btn edit-profile-btn" type="submit">
          Save Changes
        </button>
      </form>
      <Link className="link" to="/profile">
        Cancel
      </Link>
    </div>
  );
};

export default EditProfile;
