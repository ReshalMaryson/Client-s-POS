import api from "../../../api/axios";

// get logged in user details
export const getUser = async (setUser) => {
  try {
    const res = await api.get(`/users/me`);
    if (res.data.user.roleid.role == "admin") {
      console.log("not a consumer");
    }
    setUser(res.data.user);

    // console.log(res.data.user);
  } catch (err) {
    console.log(err.response?.data || err.message);
    console.log(err);
  }
};

// update user
export const updateUser = async (id, updateData, setUser) => {
  try {
    const res = await api.put(`/users/${id}`, updateData);
    if (res.status == 200) {
      getUser(setUser);
    }
    console.log(res);
  } catch (err) {
    // if (err) {
    const errors = err.response.data.errors;
    errors.forEach((error) => {
      console.log(error.msg);
    });
    // }
  }
};

//delete account
export const deleteAccount = async (id, logoutReq, navigate, contextEmpty) => {
  try {
    // const res = await api.delete(`/users/${id}`);
    const res = await api.delete(`/users/6a455e685735c9b8806f8bd9`);

    if (res.status == 200) {
      logoutReq(navigate, contextEmpty);
    }
    // console.log(res)
  } catch (err) {
    console.log(err);
  }
};
