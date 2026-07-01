import api from "../../../api/axios";

// get user
export const getUser = async (user, setUser) => {
  console.log(user);

  try {
    const res = await api.get(`/users/me`);
    if (res.data.user.roleid.role == "admin") {
      console.log("not a consumer");
    }
    setUser(res.data.user);

    console.log(res.data.user);
  } catch (err) {
    console.log(err.response?.data || err.message);
    console.log(err);
  }
};
