import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { authenticate } from "../../app/store";
import { Link, useNavigate } from "react-router-dom";

/**
  The AuthForm component can be used for Login or Sign Up.
  Props for Login: name="login", displayName="Login"
  Props for Sign up: name="signup", displayName="Sign Up"
**/

const AuthForm = ({ name, displayName }) => {
  const { error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const formName = evt.target.name;

    const email = evt.target.email.value;
    const password = evt.target.password.value;

    if (name === "signup") {
      const first_name = evt.target.first_name.value;
      const last_name = evt.target.last_name.value;
      dispatch(
        authenticate({
          first_name,
          last_name,
          email,
          password,
          method: formName,
        })
      );
      navigate("/");
    } else {
      dispatch(authenticate({ email, password, method: formName }));
      navigate("/");
    }
  };

  return (
    <div>
      {name === "signup" ? (
        <div className="login-signup-container">
          <h2>Create new account</h2>
          <form
            className="login-signup-form"
            onSubmit={handleSubmit}
            name={name}
          >
            <div>
              <label htmlFor="first name">
                <small>First Name</small>
              </label>
              <input
                className="login-signup-input"
                required
                name="first_name"
                type="text"
              />
            </div>
            <div>
              <label htmlFor="last name">
                <small>Last Name</small>
              </label>
              <input
                className="login-signup-input"
                required
                name="last_name"
                type="text"
              />
            </div>
            <div>
              <label htmlFor="email">
                <small>Email</small>
              </label>
              <input
                className="login-signup-input"
                required
                name="email"
                type="text"
              />
            </div>
            <div>
              <label htmlFor="password">
                <small>Password</small>
              </label>
              <input
                className="login-signup-input"
                required
                name="password"
                type="text"
              />
            </div>
            <div>
              <button className="login-signup-btn btn" type="submit">
                {displayName}
              </button>
            </div>
            {error && <div> {error} </div>}
          </form>
          <h3>Or</h3>
          <Link className="link" to="/login">
            Login
          </Link>
        </div>
      ) : (
        <div className="login-signup-container">
          <h2>Sign into your account</h2>
          <form
            className="login-signup-form"
            onSubmit={handleSubmit}
            name={name}
          >
            <div>
              <label htmlFor="email">
                <small>Email</small>
              </label>
              <input
                className="login-signup-input"
                required
                name="email"
                type="text"
              />
            </div>
            <div>
              <label htmlFor="password">
                <small>Password</small>
              </label>
              <input
                className="login-signup-input"
                required
                name="password"
                type="password"
              />
            </div>
            <div>
              <button className="login-signup-btn btn" type="submit">
                {displayName}
              </button>
            </div>
            {error && <div> {error} </div>}
          </form>
          <h3>Don't have an account?</h3>
          <Link className="link" to="/signup">
            Register
          </Link>
        </div>
      )}
    </div>
  );
};

export default AuthForm;
