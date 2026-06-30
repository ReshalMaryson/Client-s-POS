import { createContext, useState } from "react";

export const AuthContext = createContext(); // this creates an empty context box,like an empty notice board.

export default function AuthProvider({ children }) {
  // this is the brain of the context
  const [user, setUser] = useState(null);

  const login = (userData) => setUser(userData); // function to set the user's data
  const logout = () => setUser(null); // empty the user data by this function

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
