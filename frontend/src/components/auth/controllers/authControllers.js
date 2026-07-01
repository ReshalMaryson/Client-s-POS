import api from "../../../api/axios";

//login
export const loginAttempt = async (user, navigate, login) => {
  if (!user.email || !user.pass) {
    alert("enter values");
    return;
  }
  try {
    const res = await api.post("/auth/login", user); // returns the user data.
    navigate("/profile");
    // console.log("login" + res.data.data); //
    login(res.data.data);
  } catch (err) {
    console.log(err.response?.data || err.message);
  }
};

// logout
export const logoutAttempt = async (navigate, logout) => {
  try {
    await api.post("/auth/logout");
    logout();
    navigate("/login");
  } catch (err) {
    console.log(err.response?.data || err.message);
  }
};
