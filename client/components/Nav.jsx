import React from 'react';
import { Link } from "react-router-dom";

const Nav = ({ loggedIn, logOut }) => {
  return (
    <div className="nav-bar">
      {loggedIn ? (
        <ul className="nav-items">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/mypage">My Books</Link></li>
          <li><Link to="/exchange">My Requests</Link></li>
          <li><Link to="/search">Find Books</Link></li>
          <li><Link to="/" onClick={logOut}>Log out</Link></li>
        </ul>
      ) : (
        <ul>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Register</Link></li>
        </ul>
      )}
    </div>
  );
};

export default Nav;
