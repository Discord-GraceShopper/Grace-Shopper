import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../app/store";

const Navbar = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutAndRedirectHome = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div>
      <nav>
        {isLoggedIn ? (
          <div className="navbar">
            <div className="logo-container">
              <img id="logo-img-nav" src="./logo-no-background.svg" />
            </div>
            {/* The navbar will show these links after you log in */}
            <div className="nav-link-container">
              <Link to="/">Home</Link>
              <Link to="/profile">Account</Link>
              <button
                className="btn"
                type="button"
                onClick={logoutAndRedirectHome}
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <div className="navbar">
            <img id="logo-img-nav" src="./logo-no-background.svg" />
            {/* The navbar will show these links before you log in */}
            <div className="nav-link-container">
              <Link to="/">Home</Link>
              <Link to="/login">Login/Register</Link>
            </div>
          </div>
        )}
      </nav>
      <hr />
    </div>
  );
};

export default Navbar;
