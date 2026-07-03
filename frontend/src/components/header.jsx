import "../css/header.css";
import api from "./../api/axios";

import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { logoutAttempt } from "../components/auth/controllers/authControllers";

export default function Header() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <>
      <div className="header">
        <h1>header</h1>
        <div className="headerlinks">
          {user ? (
            <a
              href="/login"
              onClick={() => {
                logoutAttempt(navigate, logout);
              }}
            >
              logout
            </a>
          ) : (
            <a href="/signup">signup</a>
          )}
        </div>
      </div>
      <hr />
    </>
  );
}
