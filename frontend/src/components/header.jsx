import "../css/header.css";
import api from "./../api/axios";

import { useEffect, useContext } from "react";
import { AuthContext } from "../context/authContext";

export default function Header() {
  const { user, logout } = useContext(AuthContext);

  // logout
  async function AttemptLogout() {
    try {
      const res = await api.post("/auth/logout");
      logout(); // empty AuthContext State
      navigate("/login");
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  }

  return (
    <>
      <div className="header">
        <h1>header</h1>
        <div className="headerlinks">
          {user ? (
            <a href="/login" onClick={AttemptLogout}>
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
