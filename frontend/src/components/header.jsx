import "../css/header.css";
import api from "./../api/axios";

import { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { AuthContext } from "../context/authContext";
import { logoutAttempt } from "../components/auth/controllers/authControllers";

export default function Header() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // console.log("user from header");
  // console.log(user);
  // console.log("logged in user from header");
  // console.log(loggedInUser);

  return (
    <>
      <div className="header">
        <h1>header</h1>
        <div className="headerlinks">
          {user ? (
            <>
              {" "}
              <Link
                to="/login"
                onClick={() => {
                  logoutAttempt(navigate, logout);
                  setLoggedInUser(null);
                }}
              >
                logout
              </Link>
              <Link to="/dashboard">Dashboard</Link>
            </>
          ) : (
            <a href="/signup">signup</a>
          )}
        </div>
      </div>
      <hr />
    </>
  );
}
