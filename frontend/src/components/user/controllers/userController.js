import api from "../../../api/axios";

// get user
export const getUser = async (user) => {
  console.log(user);

  //   try {
  //     const res = await api.get(`/users/${user.id}`); // refresh token will be handled by interceptor that's why request is binded in api.get().
  //     if (res.data.user.roleid.role == "admin") {
  //       console.log("not a consumer"); // role based check
  //     }
  //     setUser(res.data.user);
  //     console.log(res.data.user);
  //   } catch (err) {
  //     console.log(err.response?.data || err.message);
  //     console.log(err);
  //   }
};
