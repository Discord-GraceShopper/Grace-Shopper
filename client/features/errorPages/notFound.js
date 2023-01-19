import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="not-found-container">
      <h1>404</h1>
      <h2>Sorry, the page you are looking for doesn't seem to exist</h2>
      <Link className="link" to="/">
        Home
      </Link>
    </div>
  );
};

export default NotFound;
