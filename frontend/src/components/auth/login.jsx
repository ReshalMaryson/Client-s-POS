import "../../css/login.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext.jsx";

// import api from "../../api/axios.js";
// import Header from "../header";

// conrtollers
import { loginAttempt } from "./controllers/authControllers";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const userCredentials = {
    email: email.trim(),
    pass: password.trim(),
  };

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
        <button
          type="button"
          onClick={() => {
            loginAttempt(userCredentials, navigate, login);
          }}
        >
          login
        </button>
      </form>
    </>
  );
}
