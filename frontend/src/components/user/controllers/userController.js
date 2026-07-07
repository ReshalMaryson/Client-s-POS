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

//delete logged in user's account
export const deleteAccount = async (id, logoutReq, navigate, contextEmpty) => {
  try {
    const res = await api.delete(`/users/${id}`);

    if (res.status == 200) {
      logoutReq(navigate, contextEmpty);
    }
    // console.log(res)
  } catch (err) {
    console.log(err);
  }
};

// delete a user account
export const deleteUserAccount = async (id) => {
  try {
    const res = await api.delete(`/users/user/${id}`);
    // console.log(res);
    if (res.status == 200) {
      return;
    }
  } catch (err) {
    console.log(err);
  }
};
