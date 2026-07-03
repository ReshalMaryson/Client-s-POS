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

//sign up

//  - validate fields to create user
const validate = (formData) => {
  if (
    !formData.name ||
    !formData.email ||
    !formData.password ||
    !formData.phone
  ) {
    return "All fields are required";
  }

  if (formData.password.length < 6) {
    return "Password must be at least 6 characters";
  }
  if (formData.phone.length != 11) {
    return "Phone must be of 11 digits";
  }

  const emailRegex = /\S+@\S+\.\S+/;
  if (!emailRegex.test(formData.email)) {
    return "Invalid email format";
  }

  return null;
};

// - sign up request
export const signUp = async (
  e,
  navigate,
  formData,
  setFormData,
  setMessage,
  setLoading,
) => {
  e.preventDefault();

  const error = validate(formData);
  if (error) {
    setMessage(error);
    return;
  }

  setLoading(true);
  setMessage("");
  try {
    const res = await api.post("http://localhost:8000/users", formData, {
      headers: { "Content-Type": "application/json" },
    });

    if (res.status == 201) {
      // clear the form fields
      setFormData({
        name: "",
        email: "",
        password: "",
        phone: "",
      });

      // direct to login page
      navigate("/login");
    }
  } catch (err) {
    setFormData((prev) => ({
      ...prev,
      password: "",
    }));
    setMessage(err.response?.data?.message || "Something went wrong");
  } finally {
    setLoading(false);
  }
};
