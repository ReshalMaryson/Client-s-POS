import api from "../../api/axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  //const { id } = useParams(); // id from url after user logs in
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [updateData, setUpdateData] = useState({
    Id: "",
    name: "", // name
    email: "",
    phone: "",
  });
  // run on mount
  useEffect(() => {
    getUser();
  }, []);

  // assign data for updation
  useEffect(() => {
    if (user) {
      setUpdateData({
        Id: user._id,
        name: user.name, // name
        email: user.email,
        phone: user.phone,
      });
    }
  }, [user]);

  // fetch user for profile
  async function getUser() {
    try {
      const res = await api.get("/users/me"); // refresh token will be handled by interceptor that's why request is binded in api.get().
      if (res.data.user.roleid.role == "admin") {
        console.log("not a consumer"); // role based check
      }
      setUser(res.data.user);
      // console.log(res.data.user);
    } catch (err) {
      // console.log(err.response?.data || err.message);
      console.log(err);
    }
  }

  // logout
  async function AttemptLogout() {
    try {
      const res = await api.post("/auth/logout");

      // console.log(res.data);
      navigate("/login");
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  }

  // delete account
  async function DeleteAcc() {
    try {
      const res = await api.delete(`/users/${user._id}`);
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
