import { createContext, useEffect, useState } from "react";
import api from "../api/axios";

export const AuthContext = createContext(); // this creates an empty context box,like an empty notice board.

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);

  // get auth user
  async function getAuthUser() {
    try {
      const res = await api.get(`/users/me`);
      if (res.status == 200) {
        login(res.data.user);
      }
    } catch (err) {
      logout();
    }
  }

  useEffect(() => {
    getAuthUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
