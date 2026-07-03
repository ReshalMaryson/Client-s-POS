import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

// controller
import { logoutAttempt } from "../auth/controllers/authControllers";
import {
  getUser,
  updateUser,
  deleteAccount,
} from "./controllers/userController";

export default function Profile() {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const [user, setUser] = useState();

  const [updateData, setUpdateData] = useState({
    name: "", // name
    email: "",
    phone: "",
  });
  //  run on mount
  useEffect(() => {
    getUser(setUser);
  }, []);

  //assign data for updation
  useEffect(() => {
    if (user) {
      setUpdateData({
        name: user.name, // name
        email: user.email,
        phone: user.phone,
      });
    }
  }, [user]);

  // handle update data
  function onChangeHandle(e) {
    setUpdateData({
      ...updateData,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <>
      <h1>User Profile</h1>

      {user ? (
        <div>
          <p>
            <b>id:</b> {user._id}
          </p>
          <p>
            <b>hey:</b> {user.name}
          </p>
          <p>
            <b>Email:</b> {user.email}
          </p>
          <p>
            <b>role:</b> {user.roleid.role}
          </p>
        </div>
      ) : (
        <p>Loading user...</p>
      )}
      {user ? (
        <div className="updateDetails">
          <hr />

          <h2>Update User Details</h2>
          <div>
            <label htmlFor="username">uesername : </label>
            <input
              type="text"
              name="name"
              value={updateData.name}
              onChange={onChangeHandle}
            />
          </div>
          <div>
            <label htmlFor="email">email : </label>
            <input
              type="email"
              readOnly
              name="email"
              value={updateData.email}
            />
          </div>

          <div>
            <label htmlFor="phone">phone : </label>
            <input
              type="text"
              name="phone"
              value={updateData.phone}
              onChange={onChangeHandle}
            />
          </div>
          <hr />
        </div>
      ) : (
        <p>Loading data...</p>
      )}

      <div>
        <button
          onClick={() => {
            logoutAttempt(navigate, logout);
          }}
        >
          Logout
        </button>
        <button
          onClick={() => {
            updateUser(user._id, updateData, setUser);
          }}
        >
          Update Details
        </button>
        <button
          onClick={() => {
            deleteAccount(user._id, logoutAttempt, navigate, logout);
          }}
        >
          Delete Account
        </button>
      </div>
    </>
  );
}
