import { Routes, Route } from "react-router-dom";

// components
import Header from "./components/header";
import Login from "./components/auth/login";
import Profile from "./components/user/profile";
import SignUp from "./components/auth/signup";
import Dashboard from "./components/dashboard/dashboard";
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;

// npm create vite@latest
