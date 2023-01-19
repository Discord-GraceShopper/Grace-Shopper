import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../app/store";

const Navbar = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const isAdmin = useSelector((state) => state.auth.me.account_type);
  const username = useSelector((state) => state.auth.me.first_name);

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
            <Link to="/" className="logo-container">
              <img id="logo-img-nav" src="/img/logo-no-background.svg" />
            </Link>
            {/* The navbar will show these links after you log in */}
            <div className="nav-link-container">
              <h3 className="welcome-statement">Welcome, {username}</h3>
              <Link to="/">
                <img
                  className="navbar-icons"
                  src="/img/home_FILL0_wght400_GRAD0_opsz48.svg"
                />
              </Link>
              <Link to="/profile">
                <img
                  className="navbar-icons"
                  src="/img/person_FILL0_wght400_GRAD0_opsz48.svg"
                />
              </Link>
              <Link to="/cart">
                <img className="navbar-icons" src="/img/shopping-cart.svg" />
              </Link>
              {isAdmin === "ADMIN" ? (
                <>
                  <Link to="/directory">
                    <img
                      className="navbar-icons"
                      src="/img/user-directory.svg"
                    />
                  </Link>
                  <Link to="/panel">
                    <img
                      className="navbar-icons"
                      src="/img/settings-icon.svg"
                    />
                  </Link>
                </>
              ) : null}
              <button
                className="btn navbar-btn log-btn"
                type="button"
                onClick={logoutAndRedirectHome}
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <div className="navbar">
            <img id="logo-img-nav" src="/img/logo-no-background.svg" />
            {/* The navbar will show these links before you log in */}
            <div className="nav-link-container">
              <Link to="/">
                <img
                  className="navbar-icons"
                  src="/img/home_FILL0_wght400_GRAD0_opsz48.svg"
                />
              </Link>
              <Link to="/login">
                <img
                  className="navbar-icons"
                  src="/img/person_FILL0_wght400_GRAD0_opsz48.svg"
                />
              </Link>
              <Link to="/cart">
                <img className="navbar-icons" src="/img/shopping-cart.svg" />
              </Link>
            </div>
          </div>
        )}
      </nav>
      <hr />
    </div>
  );
};

export default Navbar;
