import { Routes, Route } from "react-router-dom";

// components
// import Header from "./header";
import Login from "./components/auth/login";
import Profile from "./components/user/profile";
// import SignUp from "./auth_components/signup";
function App() {
  return (
    <>
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/signup" element={<SignUp />} />*/}
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;

// npm create vite@latest
