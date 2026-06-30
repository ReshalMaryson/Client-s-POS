import "../../css/login.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios.js";
// import Header from "../header";

import { useContext } from "react";
import { AuthContext } from "../../context/authContext.jsx";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useContext(AuthContext);

  async function Attemptlogin(e) {
    e.preventDefault();

    if (!email || !password) {
      alert("enter values");
      return;
    }

    const payload = {
      email: email.trim(),
      pass: password.trim(),
    };

    try {
      const res = await api.post("/auth/login", payload); // returns the user data.
      //   navigate("/profile");
      console.log(res.data.data); //
      login(res.data.data);
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  }

  return (
    <>
      <form>
        <div>
          <label htmlFor="email">Email : </label>
          <input
            type="email"
            required
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <br />
        <div>
          <label htmlFor="password">Password : </label>
          <input
            type="password"
            required
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <button type="button" onClick={Attemptlogin}>
          login
        </button>
      </form>
    </>
  );
}
