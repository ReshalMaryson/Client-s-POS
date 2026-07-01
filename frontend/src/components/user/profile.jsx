import api from "../../api/axios";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
export default function Profile() {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  console.log(user);

  const [user2, setUser] = useState(user);
  const [updateData, setUpdateData] = useState({
    Id: "",
    name: "", // name
    email: "",
    phone: "",
  });
  //  run on mount
  useEffect(() => {
    getUser();
  }, []);

  //assign data for updation
  useEffect(() => {
    if (user) {
      setUpdateData({
        Id: user2._id,
        name: user2.name, // name
        email: user2.email,
        phone: user2.phone,
      });
    }
  }, [user]);

  //  fetch user for profile
  async function getUser() {
    try {
      const res = await api.get(`/users/${user2.id}`); // refresh token will be handled by interceptor that's why request is binded in api.get().
      if (res.data.user.roleid.role == "admin") {
        console.log("not a consumer"); // role based check
      }
      setUser(res.data.user);
      console.log(res.data.user);
    } catch (err) {
      console.log(err.response?.data || err.message);
      console.log(err);
    }
  }

  // logout
  async function AttemptLogout() {
    try {
      const res = await api.post("/auth/logout");

      console.log(res.data);
      navigate("/login");
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  }

  //   delete account
  async function DeleteAcc() {
    try {
      const res = await api.delete(`/users/${user2.id}`);
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  }

  // handle update data
  function onChangeHandle(e) {
    setUpdateData({
      ...updateData,
      [e.target.name]: e.target.value,
    });
  }

  //  update user
  async function UpdateUserDetails() {
    console.log(updateData);
    try {
      const res = await api.put("/users", updateData);
      getUser(); // refresh the user's updated data
    } catch (err) {
      // NOTE : our backend response is stored in repsonse.data object made by axios, err is just for generic axios responses.
      console.log(err.response.data.message);
    }
  }

  return (
    <>
      <h1>User Profile</h1>

      {user2 ? (
        <div>
          <p>
            <b>id:</b> {user2.id}
          </p>
          <p>
            <b>hey:</b> {user2.name}
          </p>
          <p>
            <b>Email:</b> {user2.email}
          </p>
          <p>
            <b>role:</b> {user2.role.role}
          </p>
        </div>
      ) : (
        <p>Loading user...</p>
      )}
      {user2 ? (
        <div className="updateDetails">
          <hr />

          <h2>Update User Details</h2>
          <div>
            <label htmlFor="username">uesername : </label>
            <input
              type="text"
              name="name"
              value={updateData.name} // this is not being shown
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
              onChange={onChangeHandle}
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
        <button onClick={AttemptLogout}>Logout</button>
        <button onClick={UpdateUserDetails}>Update Details</button>
        <button onClick={DeleteAcc}>Delete Account</button>
      </div>
    </>
  );
}
