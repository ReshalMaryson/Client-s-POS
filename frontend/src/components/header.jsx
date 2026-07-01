import "../css/header.css";
import api from "./../api/axios";

import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { logoutAttempt } from "../components/auth/controllers/authControllers";

export default function Header() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  // logout
  // async function AttemptLogout() {
  //   try {
  //     const res = await api.post("/auth/logout");
  //     logout(); // empty AuthContext State
  //     navigate("/login");
  //   } catch (err) {
  //     console.log(err.response?.data || err.message);
  //   }
  // }

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
