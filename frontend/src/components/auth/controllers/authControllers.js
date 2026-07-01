import api from "../../../api/axios";

export const loginAttempt = async (user, navigate, login) => {
  console.log(user);

  if (!user.email || !user.password) {
    alert("enter values");
    return;
  }

  try {
    const res = await api.post("/auth/login", user); // returns the user data.
    navigate("/profile");
    console.log("login" + res.data.data); //
    login(res.data.data);
  } catch (err) {
    console.log(err.response?.data || err.message);
  }
};
